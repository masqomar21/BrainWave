import { Dimensions, Text, View } from 'react-native'
import Animated, { useAnimatedProps, useSharedValue } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Svg, { Circle, G } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function TestScreen() {
  const progress = useSharedValue()

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: 100 * (1 - progress.value)
  }))

  const { width, height } = Dimensions.get('window')

  return (
      <SafeAreaView className="flex-1 bg-[#0047AB] px-2 py-2">
          <View className="bg-white">
              <Text className="text-center">Test</Text>
          </View>
          <View className="flex-1 justify-center items-center bg-slate-400">
              <Text>ini test </Text>
              <Svg className="absolute">
                  {/* <G rotation="-90" origin="50, 50"> */}
                  <Circle cx={width / 2} cy={height / 2} r="45" fill="none" stroke="black" strokeWidth="30" />
                  <AnimatedCircle cx={width / 2} cy={height / 2} r="45" fill="none" stroke="red" strokeWidth="15" strokeLinecap="round" strokeDasharray={20} />
                  {/* </G> */}
              </Svg>
          </View>

      </SafeAreaView>
  )
}
