import React from 'react'
import { Button, Text, View } from 'react-native'

import { SafeAreaView } from 'react-native-safe-area-context'

export default function HomeScreen({ navigation }) {

  return (
      <SafeAreaView className="flex-1">

          <View className="flex-1 justify-center items-center bg-blue-700">
              <Text className="font-bold text-5xl">Home screen testing</Text>

              <Text>New Record</Text>
              <Button title="go to new record" onPress={() => navigation.navigate('NewRecord')} />

          </View>
      </SafeAreaView>
  )
}
