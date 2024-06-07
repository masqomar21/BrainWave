import React, { useEffect, useState } from 'react'
import {
  View, Text, Button, Image, ScrollView,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import HeaderWithBack from '../components/HeaderWithBack'
import BtnComp from '../components/Button'

export default function RecordHistory({ navigation }) {
  const [usersData, setUsersData] = useState([])

  const mappingData = () => {
    if (usersData) {
      return usersData.map((item, index) => (
          <View className="flex w-full mb-2" key={index}>
              <View
                  className="w-full flex-row justify-between items-center rounded-2xl mb-1"
              >
                  <View className="flex flex-row items-center">
                      <Text className="text-gray-500 text-xl">{index + 1}</Text>
                      <Text className="text-gray-500 text-xl ml-3">{item.name}</Text>
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
                              name: item.name,
                              age: item.age,
                              gender: item.gender
                            }
                          )}
                      />
                      <BtnComp
                          title="Hapus"
                          classComp="bg-red-500 ml-1"
                          icon="trash"
                          onPress={() => removeUser(index)}
                      />
                  </View>
              </View>
              <View className="w-full self-center border-t border-gray-400" />
          </View>
      ))
    }
    return null
  }

  const removeUser = async (index) => {
    Alert.alert(
      'Hapus Data',
      'Apakah anda yakin ingin menghapus data ini ?',
      [
        {
          text: 'Ya',
          onPress: async () => {
            const newData = usersData.filter((item, idx) => idx !== index)
            await AsyncStorage.setItem('users', JSON.stringify(newData))
            setUsersData(newData)
          }
        },
        {
          text: 'Tidak'
        }
      ],
      { cancelable: true }
    )
  }

  const readUsersFromStorage = async () => {
    const users = await AsyncStorage.getItem('users')
    setUsersData(JSON.parse(users))
  }
  useFocusEffect(
    React.useCallback(() => {
      readUsersFromStorage()
    }, [])
  )
  // useEffect(() => {
  //   readUsersFromStorage()
  // }, [])
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
                      { usersData?.length ? mappingData() : (
                          <Text className="text-center text-gray-500">
                              Data tidak ditemukan
                          </Text>
                      )}
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView>
  )
}
