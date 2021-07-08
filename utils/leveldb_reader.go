package main

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"strings"

	"github.com/syndtr/goleveldb/leveldb"
)

func splitToJsonStrArray(str string) string {
	var fmtBuffer bytes.Buffer
	lines := strings.Split(str, "\n")
	for i, line := range lines {
		fmtBuffer.WriteString(fmt.Sprintf("\"%s\"", line))
		if i < len(lines)-1 {
			fmtBuffer.WriteString(",")
		}
	}
	return fmtBuffer.String()
}

func main() {

	f, err := os.OpenFile("leveldb.dat", os.O_RDWR|os.O_CREATE|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalf("error opening file: %v", err)
	}
	defer f.Close()

	log.SetOutput(f)

	printUsage := func() {
		fmt.Println("Usage: leveldb")
	}

	fileExists := func(path string) (bool, error) {
		_, err := os.Stat(path)
		if err == nil {
			return true, nil
		}
		if os.IsNotExist(err) {
			return false, nil
		}
		return true, err
	}

	if len(os.Args) == 1 {
		fmt.Println("Level/Snappy DB folder path is not supplied")
		printUsage()
		return
	}

	dbPath := os.Args[1]

	dbPresent, err := fileExists(dbPath)

	if !dbPresent {
		fmt.Printf("The DB path: %s does not exist.\n", dbPath)
		printUsage()
		return
	}

	db, err := leveldb.OpenFile(dbPath, nil)
	defer db.Close()

	if err != nil {
		fmt.Println("Could not open DB from:", dbPath)
		printUsage()
		return
	}

	formatValue := func(data []byte) string {
		dataStr := string(data[:])
		return fmt.Sprintf(dataStr)
	}

	printKey := func(key string) {
		data, err := db.Get([]byte(key), nil)
		if err != nil {
			log.Println("Error reading Key:", key)
			return
		}
		log.Printf("  \"%s\":%s", key, formatValue(data))
	}

	iter := db.NewIterator(nil /* slice range, default get all */, nil /* default read options */)
	for iter.Next() {
		key := iter.Key()
		keyName := string(key[:])

		printKey(keyName)

	}
	iter.Release()
	err = iter.Error()
	if err != nil {
		fmt.Println(err)
	}
}
