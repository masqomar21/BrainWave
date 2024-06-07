import {
  Dimensions, Pressable, Text, TouchableOpacity, View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, G } from 'react-native-svg'
import { Entypo, Fontisto } from '@expo/vector-icons'
import { useEffect, useRef, useState } from 'react'
import CircularLoading from '../components/CircularLoading'
import { CONSOLE } from '../lib/log'
import BtnComp from '../components/Button'

export default function TestScreen() {
  const [isRecording, setIsRecording] = useState(false)
  const [data, setData] = useState([])
  const intervalRef = useRef(null)

  const handleRecord = () => {
    setIsRecording(true)
  }

  useEffect(() => {
    if (isRecording) {
      intervalRef.current = setInterval(() => {
        const randomNumber = Math.floor(Math.random() * 100) + 1
        setData((prevData) => [...prevData, randomNumber])
      }, 10)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    //   console.log('Recording stopped')
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRecording])

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
              <View className="flex flex-row items-center justify-end">
                  <Pressable onPress={() => CONSOLE.log('home')} className="m-5 p-2 bg-white rounded-full">
                      <Entypo name="chevron-right" size={24} color="black" />
                  </Pressable>
              </View>

              <View className="flex justify-center items-center pt-20">
                  <Text className="text-3xl font-bold text-center text-white">
                      BRAINWAVE
                  </Text>

                  {/* {connectedDevice ? ( */}
                  <View className="flex justify-center items-center pt-20">
                      {!isRecording ? (
                          <TouchableOpacity
                              onPress={handleRecord}
                              className="bg-white p-5 mt-10 rounded-full aspect-square items-center"
                          >
                              <Fontisto name="power" size={100} color="#0047AB" />
                          </TouchableOpacity>

                      ) : (
                          <>
                              <CircularLoading radius={50} innerColor="#0047AB" done={false} />

                              <Text className="text-2xl font-bold text-center text-white mt-10">
                                  Data Recive
                              </Text>
                              <Text className="text-2xl font-bold text-center text-white mt-10">
                                  {data[data.length - 1]}
                              </Text>

                              <BtnComp title="selesai" onPress={() => (setIsRecording(false))} classComp="bg-green-400 mt-5 py-3 px-5" />
                          </>

                      )}

                      {/* {data.map((item, index) => (
                          <Text key={index}>{item}</Text>
                      ))} */}
                      <Pressable
                          onPress={() => CONSOLE.log('sambungkan')}
                          className="rounded-3xl bg-white p-5 text-lg font-bold text-center text-[#0047AB] mt-10"
                      >
                          <Text>selesai</Text>
                      </Pressable>

                      <BtnComp title="putuskan" onPress={() => CONSOLE.log('pustuskan')} classComp="bg-green-400 mt-5" fluid />
                  </View>

              </View>
          </SafeAreaView>

      </SafeAreaView>
  )
}
