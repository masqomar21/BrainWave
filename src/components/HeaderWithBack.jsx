import React from 'react'
import {
  Text, View, TouchableOpacity, Image
} from 'react-native'

const backIcon = require('../../assets/icons/arrowIcon.png')

export default function HeaderWithBack(props) {
  const { navigation, title } = props

  const handleBack = () => {
    navigation.goBack()
  }

  return (
      <View className="flex flex-row gap-5 px-5 py-8">
          <TouchableOpacity onPress={handleBack} className="">
              <Image source={backIcon} className="w-8 h-8" />
          </TouchableOpacity>
          <Text className="text-2xl font-bold">
              {title}
          </Text>
      </View>
  )
}
