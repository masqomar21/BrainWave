import React, { useEffect, useState } from 'react'
import {
  ScrollView, Text, TextInput, View, Dimensions
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import { LineChart } from 'react-native-chart-kit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BtnComp from '../components/Button'
import HeaderWithBack from '../components/HeaderWithBack'

export default function Detail({ navigation }) {
  const screenWidth = Dimensions.get('window').width
  const [records, setRecordsData] = useState([])
  const route = useRoute()
  const {
    id, name, age, gender
  } = route.params

  const data = {
    // labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 50, 20, 45, 28, 80]
      }
    ]
  }

  const readRecordsFromStorage = async () => {
    const items = await AsyncStorage.getItem('records')
    setRecordsData(JSON.parse(items))
  }

  useFocusEffect(
    React.useCallback(() => {
      readRecordsFromStorage()
    }, [])
  )
  // useEffect(() => {
  //   readRecordsFromStorage()
  // }, [route])

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

                      <Text className="font-bold text-base mt-3">{JSON.stringify(records)}</Text>
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

                          <LineChart
                              data={data}
                              width={screenWidth - 80}
                              height={200}
                              xAxisLabel="s"
                              chartConfig={{
                                backgroundGradientFrom: '#f0f0f0',
                                backgroundGradientTo: '#d3d2dd',
                                decimalPlaces: 0,
                                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                                style: {
                                  borderRadius: 16
                                }
                              }}
                              bezier
                              style={{
                                marginVertical: 8,
                                borderRadius: 16
                              }}
                          />
                      </View>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}
