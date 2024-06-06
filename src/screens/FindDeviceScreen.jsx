/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react'
import {
  Image, Text, View, TouchableOpacity, ScrollView, Pressable,
  Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fontisto, Entypo } from '@expo/vector-icons'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useFs from '../lib/fs'
import useBLE from '../lib/useBle'
import BtnComp from '../components/Button'
import { CONSOLE } from '../lib/log'
import ScanModal from '../components/ScanModal'

export default function FindDeviceScreen({ navigation }) {
  const recordData = useRef({})
  const [records, setRecords] = useState([])
  const [isModalOpen, setIsModdalOpen] = useState(false)

  const {
    createAndWritefile, readFile
  } = useFs()
  const {
    connectedDevice,
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connecTodDevice,
    disconnecTodDevice,
    collectedData
  } = useBLE()
  // const [dataWave, setDataWave] = useState([])
  const route = useRoute()
  const {
    userId, sound, freq, volume, date
  } = route.params

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

  const scanForDevices = async () => {
    setIsModdalOpen(true)
    const isPermissionGranted = await requestPermissions()
    if (isPermissionGranted) {
      scanForPeripherals()
    }
  }

  const handleConectDevice = async () => {
    if (allDevices.length > 0) {
      const device = allDevices[0]
      connecTodDevice(device)
      // startStreamingData(device)
    }
  }

  const handleDone = async () => {

    storeData()
    createAndWritefile(`recorde_${recordData.current.id}_${recordData.current.userId}`, collectedData)
    // console.log(collectedData)
    if (connectedDevice) {
      await disconnecTodDevice()
      scanForDevices()
      setIsModdalOpen(true)
    }

  }

  // CONSOLE.log('data', rawData)

  const handleDisconectDevice = async () => {
    if (connectedDevice) {
      await disconnecTodDevice()
      scanForDevices()
      setIsModdalOpen(true)
    }
  }

  const handleNavigarion = () => {
    Alert.alert(
      'Navigasi',
      'Apakah anda yakin ingin kembali ke halaman utama?',
      [
        {
          text: 'Ya',
          onPress: () => {
            handleDone()
            navigation.navigate('Home')
          }
        }
      ],
      { cancelable: true }
    )
    // navigation.navigate('Home')
  }

  useFocusEffect(
    React.useCallback(() => {
      getRecoredDataStorage()
      scanForDevices()
      !connectedDevice && setIsModdalOpen(true)
      // handleConectDevice()
    }, [])
  )

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <View className="flex flex-row items-center justify-end">
              <Pressable onPress={handleNavigarion} className="m-5 p-2 bg-white rounded-full">
                  <Entypo name="chevron-right" size={24} color="black" />
              </Pressable>
          </View>

          <View className="flex justify-center items-center pt-20">
              <Text className="text-3xl font-bold text-center text-white">
                  BRAINWAVE
              </Text>
              <ScanModal
                  visible={isModalOpen}
                  device={connectedDevice}
                  allDevice={allDevices}
                  closeModal={setIsModdalOpen}
                  connecTodDevice={connecTodDevice}
              />

              {/* <TouchableOpacity
                  onPress={() => CONSOLE.log('power')}
                  className="bg-white p-5 mt-10 rounded-full aspect-square items-center"
              >
                  <Fontisto name="power" size={100} color="#0047AB" />
              </TouchableOpacity> */}

              {/* <Text className="text-2xl font-bold text-center text-white mt-10">
                  Find Device
              </Text> */}

              {/* <Pressable
                  onPress={handleConectDevice}
                  className="rounded-3xl bg-white p-5 text-lg font-bold text-center text-[#0047AB] mt-10"
              >
                  <Text>sambungkan</Text>
              </Pressable> */}

              {/* <Pressable
                  onPress={handleDone}
                  className="rounded-3xl bg-white p-5 text-lg font-bold text-center text-[#0047AB] mt-10"
              >
                  <Text>selesai</Text>
              </Pressable>

              <BtnComp title="putuskan" onPress={handleDisconectDevice} classComp="bg-green-400 mt-5" fluid /> */}

              {connectedDevice ? (
                  <View className="flex justify-center items-center pt-20">
                      <TouchableOpacity
                          onPress={() => CONSOLE.log('power')}
                          className="bg-white p-5 mt-10 rounded-full aspect-square items-center"
                      >
                          <Fontisto name="power" size={100} color="#0047AB" />
                      </TouchableOpacity>

                      <Pressable
                          onPress={handleDone}
                          className="rounded-3xl bg-white p-5 text-lg font-bold text-center text-[#0047AB] mt-10"
                      >
                          <Text>selesai</Text>
                      </Pressable>

                      <BtnComp title="putuskan" onPress={handleDisconectDevice} classComp="bg-green-400 mt-5" fluid />
                  </View>

              ) : (
                  <Text className="text-2xl text-center font-bold p-5">
                      Scanning for devices
                  </Text>
              )}

          </View>
      </SafeAreaView>
  )
}
