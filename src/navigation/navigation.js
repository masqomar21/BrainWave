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

const Stack = createNativeStackNavigator()

const screens = [
  { name: 'Home', component: HomeScreen },
  { name: 'NewRecord', component: NewRecordScreen },
  { name: 'RecordHistory', component: RecordHistory },
  { name: 'ListenSound', component: ListenSound },
  { name: 'AboutApp', component: AboutApp },
  { name: 'Detail', component: Detail }
]

export default function Navigation() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Home">
              {screens.map((screen, index) => (
                  <Stack.Screen key={index} name={screen.name} component={screen.component} />
              ))}
          </Stack.Navigator>
      </NavigationContainer>
  )
}
