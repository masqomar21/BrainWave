// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationContainer } from '@react-navigation/native'
import NewRecordScreen from '../screens/NewRecord'
import HomeScreen from '../screens/Home'
import RecordHistory from '../screens/RecordHistory'
import ListenSound from '../screens/ListenSound'
import AboutApp from '../screens/AboutApp'
import Detail from '../screens/Detail'
import FindDeviceScreen from '../screens/FindDeviceScreen'

import useBLE from '../lib/useBle'

const Stack = createNativeStackNavigator()

const screens = [
  { name: 'Home', component: HomeScreen },
  { name: 'NewRecord', component: NewRecordScreen },
  { name: 'RecordHistory', component: RecordHistory },
  { name: 'ListenSound', component: ListenSound },
  { name: 'AboutApp', component: AboutApp },
  { name: 'Detail', component: Detail },
  { name: 'FindDevice', component: FindDeviceScreen }
]

export default function Navigation() {
  const { connectedDevice } = useBLE()
  // const initialScreen = 'Home'
  const initialScreen = connectedDevice ? 'Home' : 'FindDevice'

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialScreen}>
              {screens.map((screen, index) => (
                  <Stack.Screen key={index} name={screen.name} component={screen.component} />
              ))}
          </Stack.Navigator>
      </NavigationContainer>
  )
}
