import React from 'react'
import {
  View, Text, Button, Image, ScrollView
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'
import BtnComp from '../components/Button'

export default function RecordHistory({ navigation }) {
  const data = [
    {
      id: 1,
      name: 'Lucky',
      age: 300,
      gender: 'Perempuan'
    },
    {
      id: 2,
      name: 'Adelia',
      age: 400,
      gender: 'Perempuan'
    },
    {
      id: 3,
      name: 'Azdni',
      age: 500,
      gender: 'Perempuan'
    },
    {
      id: 4,
      name: 'Udin',
      age: 5000,
      gender: 'Laki-laki'
    }
  ]
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
                  onPress={() => navigation.navigate('Record')}
                  classComp="bg-green-500 mt-5 self-start"
              />
              {/* List of user */}
              <View className="mt-5">
                  <ScrollView showsVerticalScrollIndicator={false}>
                      {data.map((item, index) => (
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
                                      />
                                  </View>
                              </View>
                              <View className="w-full self-center border-t border-gray-400" />
                          </View>
                      ))}
                  </ScrollView>
              </View>
          </View>
      </SafeAreaView>
  )
}
