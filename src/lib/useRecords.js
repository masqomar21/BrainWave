import * as SQLite from 'expo-sqlite'
import { useState } from 'react'

export default function useRecords() {
  const [records, setRecords] = useState([])

  const fetchRecords = () => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM records', [], (_, { rows }) => {
        setRecords(rows)
      })
    })
  }

  const getRecords = (db) => {
    db.readTransaction(fetchRecords)
  }

  const addRecord = (db, record) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO records (nama, umur, jenis_kelamin, data) VALUES (?, ?, ?, ?)',
        [record.nama, record.umur, record.jenis_kelamin, record.data],
        (_, { insertId }) => {
          setRecords([...records, { id: insertId, ...record }])
        }
      )
      fetchRecords()
    })
  }

  const deleteRecord = (db, id) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM records WHERE id = ?', [id], () => {
        setRecords(records.filter((record) => record.id !== id))
      })
      fetchRecords()
    })
  }

  const deleteRecordByName = (db, name) => {
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM records WHERE nama = ?', [name], () => {
        setRecords(records.filter((record) => record.nama !== nama))
      })
      fetchRecords()
    })
  }

  return {
    records,
    getRecords,
    addRecord,
    deleteRecord,
    deleteRecordByName
  }
}
