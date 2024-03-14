import React from 'react'
import {
  Image, Text, View, TouchableOpacity, ScrollView, Pressable
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fontisto, Entypo } from '@expo/vector-icons'

export default function FindDeviceScreen({ navigation }) {
  const handleNavigation = (target) => {
    navigation.navigate(target)
  }

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <View className="flex flex-row items-center justify-end">
              <Pressable className="m-5 p-2 bg-white rounded-full">
                  <Entypo name="chevron-right" size={24} color="black" />
              </Pressable>
          </View>

          <View className="flex justify-center items-center pt-20">
              <Text className="text-3xl font-bold text-center text-white">
                  BRAINWAVE
              </Text>
              <TouchableOpacity className="bg-white p-5 mt-10 rounded-full aspect-square items-center">
                  <Fontisto name="power" size={100} color="#0047AB" />
              </TouchableOpacity>

          </View>
      </SafeAreaView>
  )
}
