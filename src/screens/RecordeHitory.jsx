import React from 'react'
import { View, Text, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function RecordeHitory({ navigation }) {
  return (
      <SafeAreaView className="flex-1">
          <Button title="goback" onPress={() => navigation.goBack()} />
          <Text> Record history screen</Text>

          <Button title="go to record history" onPress={() => navigation.navigate('home')} />
      </SafeAreaView>
  )
}
