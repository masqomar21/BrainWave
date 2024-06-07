import {
  View, Text, Modal, SafeAreaView
} from 'react-native'
import { useEffect, useState } from 'react'
import CircularLoading from './CircularLoading'
import BtnComp from './Button'

export default function ScanModal(props) {
  const {
    visible, device, allDevice, closeModal, connecTodDevice
  } = props
  const [isSpinning, setIsSpinnig] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const handleConectDevice = async () => {
    setIsLoading(true)
    // setIsSpinnig(false)
    if (allDevice.length > 0) {
      await connecTodDevice(allDevice[0])
      // startStreamingData(device)
    }
  }

  useEffect(() => {
    setIsLoading(false)
    setIsSpinnig(true)
    device ? closeModal(false) : closeModal(true)
    // console.log('device', device)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [device])
  return (
      <Modal animationType="slide" transparent visible={visible}>
          {/* <Text>modal</Text> */}
          <SafeAreaView className="flex-1 justify-center items-center px-3 bg-zinc-900/40">
              <View className="bg-white mx-10 p-10 rounded-3xl w-full">
                  <Text className="text-2xl text-center font-bold p-5">
                      Scanning for devices
                  </Text>
                  <CircularLoading radius={50} innerColor="gray" done={!isSpinning} />
                  {allDevice.length > 0 && (
                  <>
                      <Text className="text-2xl text-center font-bold p-5">
                          Device found
                          {` ${allDevice[0].name}`}
                      </Text>
                      <BtnComp title={!isLoading ? 'Conect to Device' : 'Connecting...'} onPress={handleConectDevice} fluid />
                  </>
                  )}
              </View>
          </SafeAreaView>

      </Modal>
  )
}
