import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Navigation from './src/navigation/navigation'

export default function App() {

  return (
      <NavigationContainer>
          <Navigation />
      </NavigationContainer>

  )
}
