/* eslint-disable no-alert */
import React, { useEffect, useState } from 'react'
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableOpacity,
	TextInput,
	Alert
} from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context'
import Slider from '@candlefinance/slider'
import SelectDropdown from 'react-native-select-dropdown'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import HeaderWithBack from '../components/HeaderWithBack'
import BtnComp from '../components/Button'
import useBLE from '../lib/useBle'

const test = require('../../assets/test.png')
const ombak = require('../../assets/images/ombak.png')
const hujan = require('../../assets/images/hujan.png')
const burung = require('../../assets/images/burung.png')
const api = require('../../assets/images/api.png')

export default function NewRecordScreen({ navigation }) {
	const route = useRoute()
	const { id, name, age, gender } = route.params

	const [sound, setSound] = useState('')
	const [freq, setFreq] = useState(0)
	const [volume, setVolume] = useState(25)

	const { isBluetoothEnabled } = useBLE()
	// const [recordsData, setRecordsData] = useState([])

	const handleSound = (soundType) => {
		setSound(soundType)
		// setFreq('')
	}

	const handleFreq = (freqType) => {
		setFreq(freqType)
		// setSound('')
	}

	const handleNavigate = async () => {
		const isActive = await isBluetoothEnabled()
		if (isActive === 'PoweredOn') {
			// eslint-disable-next-line no-mixed-operators
			// if (sound === '' && freq === 0 || volume === 0) {
			//   Alert.alert('Data Tidak ada', 'Tolong lengkapi data yang di butuhkan !')
			// } else {
			navigation.navigate('FindDevice', {
				userId: id,
				sound,
				freq,
				volume,
				date: new Date().toDateString()
			})
			// }
		} else {
			Alert.alert('Bluetooth Mati', 'Tolong Hidupkan Bluetooth !')
		}
	}

	return (
		<SafeAreaView className='flex-1 bg-gray-200'>
			<HeaderWithBack
				title='Buat Rekaman baru'
				navigation={navigation}
			/>
			<ScrollView showsVerticalScrollIndicator={false}>
				<View className='flex-1 px-5'>
					{/* <Text className="text-center text-base font-bold">
                      { sound !== '' ? sound : 'Pilih Suara'}
                      {' '}
                      { freq !== 0 ? `(${freq} Hz)` : ''}
                      {' '}
                      { volume !== 0 ? `(${volume} %)` : ''}
                  </Text> */}

					<View
						className='w-full rounded-xl p-5 bg-white'
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
						<Text className='font-bold text-base mt-3'>Nama</Text>
						<TextInput
							className='w-full p-3 rounded-lg border border-gray-300'
							value={name}
							editable={false}
							selectTextOnFocus={false}
						/>
						<Text className='font-bold text-base mt-3'>Umur</Text>
						<TextInput
							className='w-full p-3 rounded-lg border border-gray-300'
							value={age}
							keyboardType='numeric'
							editable={false}
							selectTextOnFocus={false}
						/>
						<Text className='font-bold text-base mt-3'>Jenis Kelamin</Text>
						<TextInput
							className='w-full p-3 rounded-lg border border-gray-300'
							value={gender}
							editable={false}
							selectTextOnFocus={false}
						/>
						<Text className='font-bold text-base mt-5'>Pilih Suara</Text>

						<View className='flex w-full gap-3 pt-6'>
							<View className='flex w-full flex-row'>
								<TouchableOpacity
									className={`flex-1 ${
										sound === 'ombak' ? 'bg-blue-500' : 'bg-white'
									} rounded-lg mr-3 p-3 border border-gray-200`}
									style={{
										shadowColor: '#000000',
										shadowOffset: {
											width: 0,
											height: 4
										},
										shadowOpacity: 0.2,
										shadowRadius: 4,
										elevation: 3
									}}
									onPress={() => handleSound('ombak')}>
									<View className='w-full h-32'>
										<Image
											source={ombak}
											className='w-full h-full'
										/>
									</View>
									<Text className=' font-bold text-center text-base'>
										Ombak
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className={`flex-1 ${
										sound === 'hujan' ? 'bg-blue-500' : 'bg-white'
									} rounded-lg p-3 border border-gray-200`}
									style={{
										shadowColor: '#000000',
										shadowOffset: {
											width: 0,
											height: 4
										},
										shadowOpacity: 0.2,
										shadowRadius: 4,
										elevation: 3
									}}
									onPress={() => handleSound('hujan')}>
									<View className='w-full h-32'>
										<Image
											source={hujan}
											className='w-full h-full'
										/>
									</View>
									<Text className=' font-bold text-center text-base'>
										Hujan
									</Text>
								</TouchableOpacity>
							</View>
							<View className='flex w-full flex-row'>
								<TouchableOpacity
									className={`flex-1 ${
										sound === 'Kicau_burung' ? 'bg-blue-500' : 'bg-white'
									} rounded-lg mr-3 p-3 border border-gray-200`}
									style={{
										shadowColor: '#000000',
										shadowOffset: {
											width: 0,
											height: 4
										},
										shadowOpacity: 0.2,
										shadowRadius: 4,
										elevation: 3
									}}
									onPress={() => handleSound('Kicau_burung')}>
									<View className='w-full h-32'>
										<Image
											source={burung}
											className='w-full h-full'
										/>
									</View>
									<Text className=' font-bold text-center text-base'>
										Kicau Burung
									</Text>
								</TouchableOpacity>
								<TouchableOpacity
									className={`flex-1 ${
										sound === 'api_unggun' ? 'bg-blue-500' : 'bg-white'
									} rounded-lg p-3 border border-gray-200`}
									style={{
										shadowColor: '#000000',
										shadowOffset: {
											width: 0,
											height: 4
										},
										shadowOpacity: 0.2,
										shadowRadius: 4,
										elevation: 3
									}}
									onPress={() => handleSound('api_unggun')}>
									<View className='w-full h-32'>
										<Image
											source={api}
											className='w-full h-full'
										/>
									</View>
									<Text className=' font-bold text-center text-base'>
										Api Unggun
									</Text>
								</TouchableOpacity>
							</View>
						</View>

						<View className='w-full pt-7'>
							<Text className='font-bold text-base'>Frekuensi</Text>
						</View>
						<View className='flex w-full flex-row justify-around rounded-lg border border-gray-300'>
							<TouchableOpacity
								className={`${
									freq === 3 ? 'bg-blue-500' : ''
								} flex-1 border-r border-gray-300`}
								onPress={() => handleFreq(3)}>
								<Text className='text-center text-base py-1'>3 Hz</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className={`${
									freq === 6 ? 'bg-blue-500' : ''
								} flex-1 border-r border-gray-300`}
								onPress={() => handleFreq(6)}>
								<Text className='text-center text-base py-1'>6 Hz</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className={`${
									freq === 9 ? 'bg-blue-500' : ''
								} flex-1 border-gray-300`}
								onPress={() => handleFreq(9)}>
								<Text className='text-center text-base py-1'>9 Hz</Text>
							</TouchableOpacity>
						</View>

						<View className='w-full pt-7'>
							<Text className='font-bold text-base'>Volume</Text>
						</View>
						<View className='w-full flex items-center'>
							<Slider
								className=''
								value={volume}
								disabled={false}
								min={20}
								max={30}
								onChange={(value) => {
									setVolume(value)
								}}
								width={320}
								height={35}
								step={1}
								showBallIndicator={false}
								maximumTrackTintColor='#c7c7c7'
								minimumTrackTintColor='#2549A6'
							/>
						</View>
						<BtnComp
							title='Dengarkan'
							onPress={() => handleNavigate()}
							classComp='bg-green-400 mt-5'
							fluid
						/>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	)
}
