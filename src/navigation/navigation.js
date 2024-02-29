// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationContainer } from '@react-navigation/native'
import NewRecordScreen from '../screens/NewRecord'
import HomeScreen from '../screens/Home'
import RecordeHitory from '../screens/RecordeHitory'

const Stack = createNativeStackNavigator()

export default function Navigation() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="NewRecord" component={NewRecordScreen} />
              <Stack.Screen name="RecordeHitory" component={RecordeHitory} />
          </Stack.Navigator>
      </NavigationContainer>
  )
}
