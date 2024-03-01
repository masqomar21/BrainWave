import React from 'react'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'

export default function ListenSound({ navigation }) {
  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Riwayat Rekaman" navigation={navigation} />
          <View className="flex-1 px-5">

              <Text>Dengar suara</Text>

          </View>

      </SafeAreaView>
  )
}
