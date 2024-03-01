import React from 'react'
import {
  Text, View, Image, TouchableWithoutFeedback, Pressable
} from 'react-native'
import { Entypo } from '@expo/vector-icons'

export default function HeaderWithBack(props) {
  const { navigation, title } = props

  const handleBack = () => {
    navigation.goBack()
  }

  return (
      <View className="flex flex-row items-center gap-5 px-5 py-8">
          <Pressable onPress={handleBack}>
              <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-bold">
              {title}
          </Text>
      </View>
  )
}
