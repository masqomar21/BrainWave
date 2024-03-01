import React from 'react'
import {
  View, Text, Button, Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'

export default function RecordHitory({ navigation }) {
  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Record History" navigation={navigation} />
          <View className="flex-1 px-5">

              <Text>Record History</Text>

          </View>
      </SafeAreaView>
  )
}
