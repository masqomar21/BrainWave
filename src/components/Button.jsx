import React from 'react'
import {
  Text, TouchableOpacity
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

export default function BtnComp(props) {
  const {
    title, onPress, classComp, fluid, icon
  } = props
  return (
      <TouchableOpacity
          onPress={onPress}
          className={`bg-blue-500 flex flex-row items-center rounded-lg ${fluid
            ? 'w-full p-3' : 'py-1 px-2'} ${classComp}`}
      >
          {icon && <FontAwesome name={icon} size={16} color="white" />}
          <Text className={`text-white text-center font-bold ml-1  ${fluid ? 'w-full' : ''}`}>
              {title}
          </Text>
      </TouchableOpacity>
  )
}
