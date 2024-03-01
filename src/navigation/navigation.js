// eslint-disable-next-line no-unused-vars
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NavigationContainer } from '@react-navigation/native'
import NewRecordScreen from '../screens/NewRecord'
import HomeScreen from '../screens/Home'
import RecordHitory from '../screens/RecordHitory'
import ListenSound from '../screens/ListenSound'
import AboutApp from '../screens/AboutApp'

const Stack = createNativeStackNavigator()

const screens = [
  { name: 'Home', component: HomeScreen },
  { name: 'NewRecord', component: NewRecordScreen },
  { name: 'RecordHitory', component: RecordHitory },
  { name: 'ListenSound', component: ListenSound },
  { name: 'AboutApp', component: AboutApp }
]

export default function Navigation() {

  return (
      <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
              {screens.map((screen, index) => (
                  <Stack.Screen key={index} name={screen.name} component={screen.component} />
              ))}
          </Stack.Navigator>
      </NavigationContainer>
  )
}
