import React, { useEffect, useState } from 'react'
import {
	Image,
	Text,
	View,
	TouchableOpacity,
	ScrollView,
	Alert
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'
import BtnComp from '../components/Button'

import useFs from '../lib/fs'
import useBLE from '../lib/useBle'
import { CONSOLE } from '../lib/log'
import { useFocusEffect } from '@react-navigation/native'

const test = require('../../assets/test.png')

const pencil = require('../../assets/images/pencil.png')
const file = require('../../assets/images/file.png')
const cloud = require('../../assets/images/cloud.png')
const gear = require('../../assets/images/gear.png')

export default function HomeScreen({ navigation }) {
	const [data, setData] = useState([])
	const handleNavigation = (target) => {
		navigation.navigate(target)
	}

	const { deleteAllFiles } = useFs()
	const { requestPermissions } = useBLE()

	const readRecordsFromStorage = async () => {
		const items = await AsyncStorage.getItem('records')
		const dataRecord = items ? JSON.parse(items) : []
		setData(dataRecord)
	}

	const handleResetData = () => {
		Alert.alert(
			'Peringatan',
			'Apakah anda yakin ingin menghapus semua data ?',
			[
				{
					text: 'Ya',
					onPress: () => {
						deleteAllDatas()
						deleteAllFiles()
					}
				}
			],
			{ cancelable: true }
		)
	}

	const deleteAllDatas = async () => {
		const keys = ['users', 'records', 'isFirstLaunch']
		try {
			await AsyncStorage.multiRemove(keys)
		} catch (error) {
			// eslint-disable-next-line no-console
			console.error(error)
		}
	}

	useEffect(() => {
		const isFirtsLounch = async () => {
			try {
				const firstLounch = await AsyncStorage.getItem('isFirstLaunch')
				if (firstLounch === null) {
					const isPermissionGranted = requestPermissions()
					if (isPermissionGranted) {
						await AsyncStorage.setItem('isFirstLaunch', 'false')
					}
				}
			} catch (error) {
				CONSOLE.log(error)
			}
		}
		isFirtsLounch()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useFocusEffect(
		React.useCallback(() => {
			readRecordsFromStorage()
		}, [])
	)
	return (
		<SafeAreaView className='flex-1 bg-gray-200'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				className=' bg-gray-200'>
				<View className='p-5'>
					<Text className='py-5 text-2xl font-bold '>Halo, Selamat Datang</Text>

					<View className='flex w-full gap-5'>
						<View className=' flex w-full flex-row'>
							<TouchableOpacity
								className='flex-1 h-32 bg-white flex-row rounded-2xl mr-3 p-3'
								style={{
									shadowColor: '#000000',
									shadowOffset: {
										width: 0,
										height: 12
									},
									shadowOpacity: 0.58,
									shadowRadius: 16,
									elevation: 24
								}}
								onPress={() => handleNavigation('NewRecord')}>
								<Text className=' font-bold text-xl flex-1'>
									Buat Rekaman Baru
								</Text>
								<Image
									source={pencil}
									className='w-16 h-16 self-end'
								/>
							</TouchableOpacity>
							<TouchableOpacity
								className='flex-1 h-32 bg-white flex-row rounded-2xl p-3'
								style={{
									shadowColor: '#000000',
									shadowOffset: {
										width: 0,
										height: 12
									},
									shadowOpacity: 0.58,
									shadowRadius: 16,
									elevation: 24
								}}
								onPress={() => handleNavigation('RecordHistory')}>
								<Text className=' font-bold text-xl flex-1'>
									Riwayat Rekaman
								</Text>
								<Image
									source={file}
									className='w-16 h-16 self-end'
								/>
							</TouchableOpacity>
						</View>
						<View className='flex w-full flex-row'>
							<TouchableOpacity
								className='flex-1 h-32 bg-white flex-row rounded-2xl p-3'
								style={{
									shadowColor: '#000000',
									shadowOffset: {
										width: 0,
										height: 12
									},
									shadowOpacity: 0.58,
									shadowRadius: 16,
									elevation: 24
								}}
								onPress={() => handleNavigation('AboutApp')}>
								<Text className=' font-bold text-xl flex-1'>
									Tentang Aplikasi
								</Text>
								<Image
									source={gear}
									className='w-16 h-16 self-end'
								/>
							</TouchableOpacity>
						</View>
					</View>

					<View className=' flex-1 py-12'>
						<View
							className='w-full  bg-white rounded-xl p-5'
							style={{
								shadowColor: '#000000',
								shadowOffset: {
									width: 0,
									height: 6
								},
								shadowOpacity: 0.26,
								shadowRadius: 8,
								elevation: 5
							}}>
							<Text className='font-bold text-xl pb-5'>Aktivitas Terbaru</Text>

							<ScrollView showsVerticalScrollIndicator={false}>
								{data.map((item, index) => (
									<View
										className='flex w-full mb-3'
										key={index}>
										<View className='w-full flex-row justify-between items-center rounded-2xl mb-1'>
											<Text className='text-gray-500 text-xl'>
												Rekanam dengan{' '}
												{item.sound
													? `suara ${item.sound}`
													: `frekuensi ${item.freq}`}{' '}
											</Text>
											<Text>{item.date}</Text>
										</View>
										<View className='w-full self-center border-t border-gray-400' />
									</View>
								))}
							</ScrollView>
						</View>
						<BtnComp
							title='Reset Data'
							onPress={() => handleResetData()}
							classComp='bg-red-400 mt-5'
							fluid
						/>
						{/* <BtnComp
					title='Reset data file'
					onPress={() => deleteAllFiles()}
					classComp='bg-red-400 mt-5'
					fluid
				/> */}
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
