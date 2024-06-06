import { Dimensions, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, G } from 'react-native-svg'
import CircularLoading from '../components/CircularLoading'

export default function TestScreen() {

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <View className="bg-white">
              <Text className="text-center">Test</Text>
          </View>
          <CircularLoading radius={50} innerColor="#4ed214" />

      </SafeAreaView>
  )
}
