import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'

export default function AboutApp({ navigation }) {
  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Tenatang Aplikasi" navigation={navigation} />
          <View className="flex-1 px-5">

              <Text>tentang aplikasi</Text>

          </View>

      </SafeAreaView>
  )
}
