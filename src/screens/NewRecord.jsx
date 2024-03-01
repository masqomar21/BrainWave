import React from 'react'
import {
  View, Text, Button, Image
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'

const test = require('../../assets/test.png')

export default function NewRecordScreen({ navigation }) {

  return (
      <SafeAreaView className="flex-1 bg-gray-200">
          <HeaderWithBack title="Buat Rekaman baru" navigation={navigation} />
          <View className="flex-1 px-5">

              <Text>New Record screen</Text>

              <Image source={test} className="w-20 h-20" />

              <Button title="go to record history" onPress={() => navigation.navigate('RecordHitory')} />
          </View>
      </SafeAreaView>
  )
}
