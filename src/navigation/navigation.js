// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import NewRecordScreen from '../screens/NewRecord'
import HomeScreen from '../screens/Home'

const Stack = createNativeStackNavigator()

export default function Navigation() {

  return (
      <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
          <Stack.Screen name="NewRecord" options={{ headerTitle: 'New Record' }} component={NewRecordScreen} />
      </Stack.Navigator>
  )
}
