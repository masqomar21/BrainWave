/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useEffect, useState } from 'react'
import {
  View, Text, Button, Image, ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as SQLite from 'expo-sqlite'
import HeaderWithBack from '../components/HeaderWithBack'
import BtnComp from '../components/Button'

export default function RecordHistory({ navigation }) {
  const [users, setUsers] = useState([])
  const db = SQLite.openDatabase('example.db')
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users (id integer primary key not null, nama text, umur int, jenis_kelamin text);
        CREATE TABLE IF NOT EXISTS datas (id integer primary key not null, user_id, data_path text);
        CREATE TABLE IF NOT EXISTS activities (id integer primary key not null, time text, activity text);`
      )
    })
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users',
        null,
        (txObj, resultSet) => setUsers(resultSet.rows._array),
        (txObj, error) => console.log('Error:', error)
      )
    })
  })

  const deleteUsers = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            const existingUsers = [...users].filter((user) => user.id !== id)
            setUsers(existingUsers)
          }
        },
        (txObj, error) => console.log('Error:', error)
      )
    })
  }

  const showUsers = () => {
    return users.map((item, index) => (
        <View className="flex w-full mb-2" key={index}>
            <View
                className="w-full flex-row justify-between items-center rounded-2xl mb-1"
            >
                <View className="flex flex-row items-center">
                    <Text className="text-gray-500 text-xl">{index + 1}</Text>
                    <Text className="text-gray-500 text-xl ml-3">{item.nama}</Text>
                </View>
                <View className="flex flex-row">
                    <BtnComp
                        title="Detail"
                        classComp="bg-blue-500 ml-1"
                        icon="edit"
                        onPress={() => navigation.navigate(
                          'Detail',
                          {
                            id: item.id,
                            nama: item.nama,
                            umur: item.umur,
                            jenisKelamin: item.jenis_kelamin
                          }
                        )}
                    />
                    <BtnComp
                        title="Hapus"
                        classComp="bg-red-500 ml-1"
                        icon="trash"
                        onPress={() => deleteUsers(item.id)}
                    />
                </View>
            </View>
            <View className="w-full self-center border-t border-gray-400" />
        </View>
    ))
  }

  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Record History" navigation={navigation} />
          <View
              className="w-full rounded-xl p-5 bg-white"
              style={{
                shadowColor: '#000000',
                shadowOffset: {
                  width: 0,
                  height: 6
                },
                shadowOpacity: 0.26,
                shadowRadius: 8,
                elevation: 5
              }}
          >
              <BtnComp
                  title="+ Tambah Pengguna"
                  onPress={() => navigation.navigate('NewRecord')}
                  classComp="bg-green-500 mt-5 self-start"
              />
              {/* List of user */}
              <View className="mt-5">
                  <ScrollView showsVerticalScrollIndicator={false}>
                      {showUsers()}
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView>
  )
}
