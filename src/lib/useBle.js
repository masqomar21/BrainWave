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

export default function useBLE() {
  const bleManager = useMemo(() => new BleManager(), [])
  //   const bleManager = useMemo(() => new BleManager(), [])
  const [allDevices, setALlDevices] = useState([])
  const [connectedDevice, setConnectedDevice] = useState(null)
  const [rawData, setRawData] = useState(null)
  const [err, setErr] = useState(null)

  const isBluetoothEnabled = async function () {
    // console.log(await bleManager.state())
    return bleManager.state()
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
    devices.findIndex((device) => nextDevice.id === device.id) > -1
  }

  const scanForPeripherals = function () {
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        CONSOLE.log(error)
        setErr(error)
      }
      if (device) {
        CONSOLE.log('defice found', device.name)
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
      bleManager.startDeviceScan()
      startStreamingData(deviceConnection)
    } catch (e) {
      setALlDevices([])
      setErr(e)
      CONSOLE.log('FAILED TO CONNECT', e)
    }
  }

  const disconnecTodDevice = async function () {
    if (connectedDevice) {
      try {
        bleManager.cancelDeviceConnection(connectedDevice.id)
        setErr(null)
        setALlDevices([])
        setRawData(null)
      } catch (e) {
        CONSOLE.log('FAILED TO DISCONNECT', e)
        setErr(e)
      }
    }
  }

  const readData = function (error, Characteristic) {
    if (error) {
      CONSOLE.log(error)
      setErr(error)
      return -1
    } if (!Characteristic?.value) {
      CONSOLE.log('no data')
      return -1
    }

    const rawDataEncoded = base64.decode(Characteristic.value)
    CONSOLE.log(rawDataEncoded)
    setRawData(rawDataEncoded)
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
    if (device) {
      device.monitorCharacteristicForService(
        HEART_RATE_UUID,
        HEART_RATE_CHARACTERISTIC,
        readData
      )
    } else {
      CONSOLE.log('device not found')
    }
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
    writeData,
    err
  }

}
