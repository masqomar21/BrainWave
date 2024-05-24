/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import {
  ScrollView, Text, TextInput, View, Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useRoute } from '@react-navigation/native'

import AsyncStorage from '@react-native-async-storage/async-storage'
import BtnComp from '../components/Button'
import HeaderWithBack from '../components/HeaderWithBack'

import ChartData from '../components/chartData'

export default function Detail({ navigation }) {
  const [records, setRecordsData] = useState([])
  const route = useRoute()
  const {
    id, name, age, gender
  } = route.params

  const readRecordsFromStorage = async () => {
    const items = await AsyncStorage.getItem('records')
    const dataRecord = items ? JSON.parse(items) : []
    setRecordsData(dataRecord.filter((item) => item.userId === id))
  }

  useFocusEffect(
    React.useCallback(() => {
      readRecordsFromStorage()
    }, [])
  )

  const mapFunction = () => {
    if (records) {
      return records.map((item, index) => (
          <React.Fragment key={index}>
              <Text>
                  {'remakaman pada '}
                  {item.date}
                  {' dengan '}
                  {item.sound ? `suara ${item.sound}` : `frekuensi ${item.freq}` }
                  {' dan volume '}
                  {item.volume}
              </Text>
              <ChartData userId={id} recordId={item.id} />
          </React.Fragment>
      ))
    }
    return <Text>Belum ada rekaman</Text>
  }

  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Detail Rekaman" navigation={navigation} />
          <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-1 px-5">
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
                      <TextInput
                          className="w-full p-3 rounded-lg border border-gray-300 text-black bg-gray-300/60"
                          value={name}
                          placeholder="Nama"
                          editable={false}
                          selectTextOnFocus={false}
                      />
                      <Text className="font-bold text-base mt-3">Umur</Text>
                      <TextInput
                          className="w-full p-3 rounded-lg border border-gray-300 text-black bg-gray-300/60"
                          value={age.toString()}
                          placeholder="Umur"
                          keyboardType="numeric"
                          editable={false}
                          selectTextOnFocus={false}
                      />
                      <Text className="font-bold text-base mt-3">Jeni Kelamin</Text>
                      <TextInput
                          className="w-full p-3 rounded-lg border border-gray-300 text-black bg-gray-300/60"
                          value={gender}
                          placeholder="jenis kelamin"
                          editable={false}
                          selectTextOnFocus={false}
                      />
                      <BtnComp
                          title="Record"
                          onPress={() => navigation.navigate(
                            'ListenSound',
                            {
                              id,
                              name,
                              age,
                              gender
                            }
                          )}
                          classComp="bg-green-400 mt-5"
                          fluid
                      />
                      <View className="mt-5 flex relative">
                          <Text className="font-bold text-base">grafik</Text>
                          {mapFunction()}
                      </View>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}
