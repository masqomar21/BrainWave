import * as SQLite from 'expo-sqlite'

export const db = SQLite.openDatabase('example.db')

export const createDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (id integer primary key not null, nama text, umur int, jenis_kelamin text);
      CREATE TABLE IF NOT EXISTS datas (id integer primary key not null, user_id, data_path text);
      CREATE TABLE IF NOT EXISTS activities (id integer primary key not null, time text, activity text);`
    )
  })
}

export const dropDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql('DROP TABLE IF EXISTS users')
    tx.executeSql('DROP TABLE IF EXISTS datas')
    tx.executeSql('DROP TABLE IF EXISTS activities')
  })
}
