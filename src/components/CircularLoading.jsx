import React, { useEffect } from 'react'
import Animated, {
  Easing,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  cancelAnimation,
  withSequence
} from 'react-native-reanimated'
import { View } from 'react-native'
import { Circle, G, Svg } from 'react-native-svg'

const AnimatedCircle = Animated.createAnimatedComponent(Circle)

export default function CircularLoading(props) {
  const { radius, innerColor, done } = props

  const circumference = 2 * Math.PI * radius
  const strockWidtInner = radius / 10
  const strockWidtOuter = radius / 5
  const halfCircle = radius + strockWidtOuter
  const diameter = 2 * halfCircle

  const progress = useSharedValue(0)
  const rotate = useSharedValue(0)

  const startAnimetion = () => {
    progress.value = withTiming(0.6, { duration: 1000 })

    progress.value = withRepeat(withSequence(
      withTiming(0.7, { duration: 800 }),
      withTiming(0.1, { duration: 1500 })
    ), -1, true)
    rotate.value = withRepeat(withTiming(360, { duration: 900, easing: Easing.linear }), -1, false)
  }

  const animatedProps = useAnimatedProps(() => {
    return {
      strokeDashoffset: (1 - progress.value) * circumference
    }
  }, [])

  const handleStopAnimation = () => {
    cancelAnimation(progress)
    cancelAnimation(rotate)
  }

  const rotateAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotate.value}deg` }]
    }
  }, [])

  useEffect(() => {
    startAnimetion()
    if (done) {
      handleStopAnimation()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
      <View className="justify-center, items-center">
          <Animated.View style={rotateAnimatedStyle}>
              <Svg width={diameter} height={diameter} viewBox={`0 0 ${diameter} ${diameter}`}>
                  <G rotation="-90" origin={`${halfCircle}, ${halfCircle}`}>
                      <Circle
                          cx="50%"
                          cy="50%"
                          r={radius}
                          fill="none"
                          stroke="black"
                          opacity={0.25}
                          strokeWidth={strockWidtOuter}
                      />

                      <AnimatedCircle
                          cx="50%"
                          cy="50%"
                          r={radius}
                          fill="none"
                          stroke={innerColor || 'red'}
                          strokeWidth={strockWidtInner}
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          animatedProps={animatedProps}
                      />

                  </G>
              </Svg>
          </Animated.View>
      </View>
  )
}
