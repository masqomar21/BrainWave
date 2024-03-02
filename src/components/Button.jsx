import React from 'react'
import {
  Text, TouchableOpacity
} from 'react-native'

export default function BtnComp(props) {
  const {
    title, onPress, classComp, fluid
  } = props
  return (
      <TouchableOpacity
          onPress={onPress}
          className={`bg-blue-500 p-3 rounded-lg self-center ${classComp} ${fluid ? 'w-full' : 'w-1/2'}`}
      >
          <Text className="text-white text-center font-bold">
              {title}
          </Text>
      </TouchableOpacity>
  )
}
