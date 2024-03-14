import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import Navigation from './src/navigation/navigation'

export default function App() {

  return (
      <>
          <StatusBar style="auto" backgroundColor="#e5e7eb" />
          <SafeAreaProvider>
              <Navigation />
          </SafeAreaProvider>
      </>

  )
}
