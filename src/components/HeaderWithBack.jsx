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
      <View className="flex flex-row items-center px-5">
          <Pressable onPress={handleBack} className="pr-8 py-8">
              <Entypo name="chevron-left" size={24} color="black" />
          </Pressable>
          <Text className="text-2xl font-bold">
              {title}
          </Text>
      </View>
  )
}
