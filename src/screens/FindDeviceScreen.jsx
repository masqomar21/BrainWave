import React, { useRef, useState } from 'react'
import {
  Image, Text, View, TouchableOpacity, ScrollView, Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fontisto, Entypo } from '@expo/vector-icons'

import { useFocusEffect, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useFs from '../lib/fs'

export default function FindDeviceScreen({ navigation }) {
  // const [recordData, setRecordData] = useState({})
  const recordData = useRef({})
  const [records, setRecords] = useState([])

  // temporary data for testing
  const [data, setData] = useState()
  const {
    createAndWritefile, readFile, deleteFile, cekFileLocation, getAllFiles
  } = useFs()
  const route = useRoute()
  const {
    userId, sound, freq, volume, date
  } = route.params

  console.log('userId:', userId)
  const handlePress = () => {
    storeData()
    const generateRandomNumbers = () => {
      const randomNumbers = []
      for (let i = 0; i < 100; i += 1) {
        randomNumbers.push(Math.floor(Math.random() * 100))
      }
      return randomNumbers
    }
    console.log('recordData:', recordData)
    createAndWritefile(`recorde_${recordData.current.id}_${recordData.current.userId}`, generateRandomNumbers())

  }

  const storeData = async () => {
    try {
      let newId = 1
      if (records.length > 0) {
        newId = records[records.length - 1].id + 1
      }
      const newItem = {
        id: newId,
        userId,
        sound,
        freq,
        volume,
        date
      }
      recordData.current = newItem
      setRecords([...records, newItem])
      const updateDataRecords = [...records, newItem]
      AsyncStorage.setItem('records', JSON.stringify(updateDataRecords))

    } catch (e) {
      // eslint-disable-next-line no-console
      console.log('error:', e)
    }
  }
  const getRecoredDataStorage = async () => {
    const recordsDataStorage = await AsyncStorage.getItem('records')

    if (recordsDataStorage) {
      setRecords(JSON.parse(recordsDataStorage))
    }
  }

  const getRecordsDataFormFile = async () => {
    const fileName = `recorde_${recordData.current.id}_${recordData.current.userId}`
    setData(await readFile(fileName))
    cekFileLocation()
    const files = await getAllFiles()
    console.log('files:', files)

  }

  useFocusEffect(
    React.useCallback(() => {
      // storeData()
      getRecoredDataStorage()
    }, [])
  )

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <View className="flex flex-row items-center justify-end">
              <Pressable onPress={() => (navigation.goBack())} className="m-5 p-2 bg-white rounded-full">
                  <Entypo name="chevron-right" size={24} color="black" />
              </Pressable>
          </View>

          <View className="flex justify-center items-center pt-20">
              <Text className="text-3xl font-bold text-center text-white">
                  BRAINWAVE
              </Text>
              <Text>{JSON.stringify(data)}</Text>

              <TouchableOpacity onPress={handlePress} className="bg-white p-5 mt-10 rounded-full aspect-square items-center">
                  <Fontisto name="power" size={100} color="#0047AB" />
              </TouchableOpacity>

              <Text className="text-2xl font-bold text-center text-white mt-10">
                  Find Device
              </Text>

              <Pressable onPress={getRecordsDataFormFile} className="rounded-3xl bg-white p-5 text-lg font-bold text-center text-[#0047AB] mt-10">
                  <Text>sambungkan</Text>
              </Pressable>

          </View>
      </SafeAreaView>
  )
}
