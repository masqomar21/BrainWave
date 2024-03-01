import React, { useState } from 'react'
import {
  View, Text, Image, TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@react-native-community/slider'
import HeaderWithBack from '../components/HeaderWithBack'

const ombak = require('../../assets/images/ombak.png')
const hujan = require('../../assets/images/hujan.png')
const burung = require('../../assets/images/burung.png')
const api = require('../../assets/images/api.png')

export default function ListenSound({ navigation }) {
  const [sound, setSound] = useState('')
  const [freq, setFreq] = useState(0)
  const [volume, setVolume] = useState(0)

  const handleSound = (soundType) => {
    setSound(soundType)
  }

  const handleFreq = (freqType) => {
    setFreq(freqType)
  }
  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Dengarkan Suara" navigation={navigation} />
          <View className="flex-1 px-5">

              <Text className="text-center text-base font-bold">
                  { sound !== '' ? sound : 'Pilih Suara'}
                  {' '}
                  { freq !== 0 ? `(${freq} Hz)` : ''}
                  {' '}
                  { volume !== 0 ? `(${volume} %)` : ''}
              </Text>

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
                  <Text className="font-bold text-base">Pilih Suaran</Text>

                  <View className="flex w-full gap-3 pt-6">
                      <View className="flex w-full flex-row">
                          <TouchableOpacity
                              className="flex-1 bg-white rounded-lg mr-3 p-3 border border-gray-200"
                              style={{
                                shadowColor: '#000000',
                                shadowOffset: {
                                  width: 0,
                                  height: 4
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3
                              }}
                              onPress={() => handleSound('ombak')}
                          >
                              <View className="w-full h-32">
                                  <Image source={ombak} className="w-full h-full" />
                              </View>
                              <Text className=" font-bold text-center text-base">Ombak</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              className="flex-1 bg-white rounded-lg p-3 border border-gray-200"
                              style={{
                                shadowColor: '#000000',
                                shadowOffset: {
                                  width: 0,
                                  height: 4
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3
                              }}
                              onPress={() => handleSound('hujan')}
                          >
                              <View className="w-full h-32">
                                  <Image source={hujan} className="w-full h-full" />
                              </View>
                              <Text className=" font-bold text-center text-base">Hujan</Text>
                          </TouchableOpacity>
                      </View>
                      <View className="flex w-full flex-row">
                          <TouchableOpacity
                              className="flex-1 bg-white rounded-lg mr-3 p-3 border border-gray-200"
                              style={{
                                shadowColor: '#000000',
                                shadowOffset: {
                                  width: 0,
                                  height: 4
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3
                              }}
                              onPress={() => handleSound('Kicau_burung')}
                          >
                              <View className="w-full h-32">
                                  <Image source={burung} className="w-full h-full" />
                              </View>
                              <Text className=" font-bold text-center text-base">Kicau Burung</Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                              className="flex-1 bg-white rounded-lg p-3 border border-gray-200"
                              style={{
                                shadowColor: '#000000',
                                shadowOffset: {
                                  width: 0,
                                  height: 4
                                },
                                shadowOpacity: 0.2,
                                shadowRadius: 4,
                                elevation: 3
                              }}
                              onPress={() => handleSound('api_unggung')}
                          >
                              <View className="w-full h-32">
                                  <Image source={api} className="w-full h-full" />
                              </View>
                              <Text className=" font-bold text-center text-base">Api Unggun</Text>
                          </TouchableOpacity>
                      </View>
                  </View>

                  <View className="w-full pt-7">
                      <Text className="font-bold text-base">Frekuensi</Text>
                  </View>
                  <View className="flex w-full flex-row justify-around rounded-lg border border-gray-300">
                      <TouchableOpacity className={`${freq === 3 ? 'bg-blue-500' : ''} flex-1 border-r border-gray-300`} onPress={() => handleFreq(3)}>
                          <Text className="text-center text-base py-1">3 Hz</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className={`${freq === 6 ? 'bg-blue-500' : ''} flex-1 border-r border-gray-300`} onPress={() => handleFreq(6)}>
                          <Text className="text-center text-base py-1">6 Hz</Text>
                      </TouchableOpacity>
                      <TouchableOpacity className={`${freq === 9 ? 'bg-blue-500' : ''} flex-1 border-gray-300`} onPress={() => handleFreq(9)}>
                          <Text className="text-center text-base py-1">9 Hz</Text>
                      </TouchableOpacity>
                  </View>

                  <View className="w-full pt-7">
                      <Text className="font-bold text-base">Volume</Text>
                  </View>
                  <Slider
                      // style={{ width: 200, height: 40 }}
                      className="w-full h-20 bg-red-800"
                      minimumValue={0}
                      maximumValue={100}
                      step={1}
                      minimumTrackTintColor="#FFFFFF"
                      maximumTrackTintColor="#000000"
                  />
              </View>

          </View>

      </SafeAreaView>
  )
}
