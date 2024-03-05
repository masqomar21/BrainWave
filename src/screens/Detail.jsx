import React from 'react'
import {
  ScrollView, Text, TextInput, View
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'
import BtnComp from '../components/Button'
import HeaderWithBack from '../components/HeaderWithBack'

export default function Detail({ navigation }) {
  const route = useRoute()
  const {
    id, name, age, gender
  } = route.params

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
                      <Text className="font-bold text-base mt-3">Nama</Text>
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
                          placeholder="Umur"
                          editable={false}
                          selectTextOnFocus={false}
                      />
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  )
}
