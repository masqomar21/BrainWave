/* eslint-disable no-return-await */
/* eslint-disable consistent-return */
import { useMemo, useState } from 'react'
// eslint-disable-next-line react-native/split-platform-components
import { PermissionsAndroid, Platform } from 'react-native'
import {
  BleManager, BleError, Device
} from 'react-native-ble-plx'
import * as ExpoDevice from 'expo-device'
import base64 from 'react-native-base64'
import { CONSOLE } from './log'

const SERVICE_UUID = process.env.SERVICE_UUID ?? 'de1bf7ab-1ca8-40a3-b797-6221c2acb33d'
const CHARACTERISTIC_UUID = process.env.CHARACTERISTIC_UUID ?? '3559f95b-3857-43f1-a7e0-cc0ab0542afc'
const TARGET_DEVICE_NAME = process.env.TARGET_DEVICE_NAME ?? 'ESP32_BLE'

export default function useBLE() {
  const bleManager = useMemo(() => new BleManager(), [])
  //   const bleManager = useMemo(() => new BleManager(), [])
  const [allDevices, setALlDevices] = useState([])
  const [connectedDevice, setConnectedDevice] = useState(null)
  const [rawData, setRawData] = useState(null)
  const [collectedData, setCollectedData] = useState([])
  const [err, setErr] = useState(null)

  const isBluetoothEnabled = async function () {
    // console.log(await bleManager.state())
    return await bleManager.state()
  }

  const requestAndroid31Permissions = async function () {
    const bluetoothScanPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    )
    const bluetoothConnectPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    )
    const fineLocationPermission = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message: 'Bluetooth Low Energy requires Location',
        buttonPositive: 'OK'
      }
    )

    return (
      bluetoothScanPermission === 'granted'
      && bluetoothConnectPermission === 'granted'
      && fineLocationPermission === 'granted'
    )
  }

  const requestPermissions = async function () {
    if (Platform.OS === 'android') {
      if ((ExpoDevice.platformApiLevel ?? -1) < 31) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'Bluetooth Low Energy requires Location',
            buttonPositive: 'OK'
          }
        )
        return granted === PermissionsAndroid.RESULTS.GRANTED
      }
      const isAndroid31PermissionsGranted = await requestAndroid31Permissions()
      return isAndroid31PermissionsGranted
    }
    return true
  }

  const isDuplicated = function (devices, nextDevice) {
    return devices.findIndex((device) => nextDevice.id === device.id) > -1
  }

  const scanForPeripherals = function () {
    // setALlDevices([])
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        CONSOLE.log(error)
        setErr(error)
        return
      }
      if (device && device.name?.includes(TARGET_DEVICE_NAME)) {
        // CONSOLE.log('defice found', device.name)
        setALlDevices((prevState) => {
          if (!isDuplicated(prevState, device)) {

            return [...prevState, device]
          }
          return prevState
        })
      }
    })
  }

  const connecTodDevice = async function (device) {
    try {
      const deviceConnection = await bleManager.connectToDevice(device.id)
      setConnectedDevice(deviceConnection)
      await deviceConnection.discoverAllServicesAndCharacteristics()
      CONSOLE.log('CONNECTED TO DEVICE', deviceConnection.id)
      // bleManager.startDeviceScan()
      bleManager.stopDeviceScan()
      setCollectedData([])
      await startStreamingData(deviceConnection)
    } catch (e) {
      // setALlDevices([])
      setErr(e)
      CONSOLE.log('FAILED TO CONNECT', e)
      await connecTodDevice(device)
    }
  }

  const disconnecTodDevice = async function () {
    if (connectedDevice) {
      try {
        await bleManager.cancelDeviceConnection(connectedDevice.id)
        setErr(null)
        setALlDevices([])
        setRawData(null)
        setCollectedData([])
      } catch (e) {
        CONSOLE.log('FAILED TO DISCONNECT', e)
        setErr(e)
      }
    }
  }

  const readData = function (error, Characteristic) {
    // CONSOLE.log('readData Called')
    if (error) {
      CONSOLE.log(error)
      setErr(error)
      return
    }
    if (!Characteristic?.value) {
      CONSOLE.log('No data received')
      return
    }

    const rawDataEncoded = base64.decode(Characteristic.value)
    // CONSOLE.log(rawDataEncoded)
    setRawData(parseInt(rawDataEncoded, 10))
    CONSOLE.log('data wave', collectedData)
    setCollectedData((prevState) => [...prevState, parseInt(rawDataEncoded, 10)])
  }

  const writeData = async function (data) {
    if (connectedDevice) {
      try {
        await connectedDevice.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          CHARACTERISTIC_UUID,
          base64.encode(data)
        )
        CONSOLE.log('data sent')
      } catch (e) {
        CONSOLE.log(e)
        setErr(e)
      }
    }
  }

  const startStreamingData = async function (device) {
    try {
      await device.monitorCharacteristicForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        readData
      )
    } catch (e) {
      CONSOLE.log(e)
      setErr(e)
    }
    // device.monitorCharacteristicForService(
    //   SERVICE_UUID,
    //   CHARACTERISTIC_UUID,
    //   (error, characteristic) => readData(error, characteristic)
    // ).then(
    //   CONSOLE.log('monitoring')
    // )
  }

  return {
    isBluetoothEnabled,
    requestPermissions,
    scanForPeripherals,
    connecTodDevice,
    allDevices,
    connectedDevice,
    disconnecTodDevice,
    rawData,
    collectedData,
    writeData,
    err
  }

}
