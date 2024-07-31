/* eslint-disable max-len */
/* eslint-disable no-alert */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useState } from 'react'
import {
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Pressable,
	Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Fontisto, Entypo } from '@expo/vector-icons'
import { useFocusEffect, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { data } from 'autoprefixer'
import useFs from '../lib/fs'
import useBLE from '../lib/useBle'
import BtnComp from '../components/Button'
import { CONSOLE } from '../lib/log'
import ScanModal from '../components/ScanModal'
import CircularLoading from '../components/CircularLoading'

export default function FindDeviceScreen({ navigation }) {
	const recordData = useRef({})
	const [records, setRecords] = useState([])
	const [isModalOpen, setIsModdalOpen] = useState(false)
	const [isRecording, setIsRecording] = useState(false)

	const { createAndWritefile, readFile } = useFs()
	const {
		connectedDevice,
		requestPermissions,
		scanForPeripherals,
		allDevices,
		connecTodDevice,
		disconnecTodDevice,
		collectedData,
		writeData
	} = useBLE()
	const route = useRoute()
	const { userId, sound, freq, volume, date } = route.params

	const getRecoredDataStorage = async () => {
		const recordsDataStorage = await AsyncStorage.getItem('records')

		if (recordsDataStorage) {
			setRecords(JSON.parse(recordsDataStorage))
		}
	}

	const storeData = async () => {
		try {
			let newId = 1
			if (records.length > 0) {
				newId = records[records.length - 1].id + 1
			}
			const newItem = {
				id: newId,
				userId,
				sound,
				freq,
				volume,
				date
			}
			recordData.current = newItem
			setRecords([...records, newItem])
			const updateDataRecords = [...records, newItem]
			AsyncStorage.setItem('records', JSON.stringify(updateDataRecords))
		} catch (e) {
			CONSOLE.log('error:', e)
		}
	}

	const scanForDevices = async () => {
		setIsModdalOpen(true)
		const isPermissionGranted = await requestPermissions()
		if (isPermissionGranted) {
			scanForPeripherals()
		}
	}

	const handleSendDataToDevice = async (data) => {
		const Data = JSON.stringify(data)
		CONSOLE.log('data', Data)
		await writeData(Data)
	}

	// const handleConectDevice = async () => {
	//   if (allDevices.length > 0) {
	//     const device = allDevices[0]
	//     connecTodDevice(device)
	//     // startStreamingData(device)
	//   }
	// }

	// const handleDone = async () => {

	//   storeData()
	//   createAndWritefile(`recorde_${recordData.current.id}_${recordData.current.userId}`, collectedData)
	//   // console.log(collectedData)
	//   if (connectedDevice) {
	//     await disconnecTodDevice()
	//     scanForDevices()
	//     setIsModdalOpen(true)
	//   }

	// }

	// CONSOLE.log('data', rawData)

	const handleDisconectDevice = async () => {
		if (connectedDevice) {
			await disconnecTodDevice()
			scanForDevices()
			setIsModdalOpen(true)
		}
	}

	const handleNavigarion = () => {
		Alert.alert(
			'Navigasi',
			'Apakah anda yakin ingin membatalkan?',
			[
				{
					text: 'Ya',
					onPress: () => {
						handleDisconectDevice()
						navigation.navigate('Home')
					}
				}
			],
			{ cancelable: true }
		)
	}
	// const dataSent = { sound, freq, volume }

	const mapingData = [
		{ sound: '', freq: 3, data: 12 },
		{ sound: '', freq: 6, data: 13 },
		{ sound: '', freq: 9, data: 14 },
		{ sound: 'hujan', freq: 0, data: 15 },
		{ sound: 'ombak', freq: 0, data: 16 },
		{ sound: 'Kicau_burung', freq: 0, data: 17 },
		{ sound: 'api_unggun', freq: 0, data: 18 },
		{ sound: 'hujan', freq: 3, data: 19 },
		{ sound: 'hujan', freq: 6, data: 1 },
		{ sound: 'hujan', freq: 9, data: 2 },
		{ sound: 'ombak', freq: 3, data: 3 },
		{ sound: 'ombak', freq: 6, data: 4 },
		{ sound: 'ombak', freq: 9, data: 5 },
		{ sound: 'Kicau_burung', freq: 3, data: 6 },
		{ sound: 'Kicau_burung', freq: 6, data: 7 },
		{ sound: 'Kicau_burung', freq: 9, data: 8 },
		{ sound: 'api_unggun', freq: 3, data: 9 },
		{ sound: 'api_unggun', freq: 6, data: 10 },
		{ sound: 'api_unggun', freq: 9, data: 11 }
	]

	const musicPlay = mapingData.find(
		(item) => item.sound === sound && item.freq === freq
	).data

	const handelStratRecord = () => {
		setIsRecording(true)
		handleSendDataToDevice({ play: 1, musicPlay, volume })
	}

	const handleStopRecord = () => {
		setIsRecording(false)
		handleSendDataToDevice({
			play: 0,
			musicPlay: 0,
			volume: 0
		})
		storeData()
		createAndWritefile(
			`recorde_${recordData.current.id}_${recordData.current.userId}_${recordData.current.date}`,
			collectedData
		)
	}

	useFocusEffect(
		React.useCallback(() => {
			getRecoredDataStorage()
			scanForDevices()
			!connectedDevice && setIsModdalOpen(true)
		}, [])
	)

	return (
		<SafeAreaView className='flex-1 bg-[#0047AB] px-2 py-2'>
			<View className='flex flex-row items-center justify-end'>
				<Pressable
					onPress={handleNavigarion}
					className='m-5 p-2 bg-white rounded-full'>
					<Entypo
						name='chevron-right'
						size={24}
						color='black'
					/>
				</Pressable>
			</View>

			<View className='flex justify-center items-center pt-20'>
				<Text className='text-3xl font-bold text-center text-white'>
					BRAINWAVE
				</Text>
				<ScanModal
					visible={isModalOpen}
					device={connectedDevice}
					allDevice={allDevices}
					closeModal={setIsModdalOpen}
					connecTodDevice={connecTodDevice}
					navigation={navigation}
				/>

				{connectedDevice ? (
					<View className='flex justify-center items-center pt-20'>
						{!isRecording ? (
							<TouchableOpacity
								onPress={handelStratRecord}
								className='bg-white p-5 mt-10 rounded-full aspect-square items-center'>
								<Fontisto
									name='power'
									size={100}
									color='#0047AB'
								/>
							</TouchableOpacity>
						) : (
							<>
								<CircularLoading
									radius={50}
									innerColor='#0047AB'
									done={false}
								/>
								<Text className='text-2xl font-bold text-center text-white mt-10'>
									Data Recive
								</Text>
								<Text className='text-2xl font-bold text-center text-white mt-10'>
									{collectedData[collectedData.length - 1]}
								</Text>

								<BtnComp
									title='selesai'
									onPress={handleStopRecord}
									classComp='bg-green-400 mt-5 py-3 px-5'
								/>
							</>
						)}
					</View>
				) : (
					<Text className='text-2xl text-center font-bold p-5'>
						Scanning for devices
					</Text>
				)}
			</View>
		</SafeAreaView>
	)
}
