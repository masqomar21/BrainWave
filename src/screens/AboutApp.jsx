/* eslint-disable max-len */
import React from 'react'
import { Image, View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderWithBack from '../components/HeaderWithBack'

import logoItera from '../../assets/logo_itera.png'
import logoBm from '../../assets/logo_bm.png'

export default function AboutApp({ navigation }) {
	return (
		<SafeAreaView className='flex-1 bg-gray-200'>
			<HeaderWithBack
				title='Tenatang Aplikasi'
				navigation={navigation}
			/>
			<View className='flex w-full px-5'>
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
					<Text className='text-base text-justify'>
						<Text className='font-bold'>BRAINWAVE</Text> adalah aplikasi perekam
						EEG (Electroencephalogram) yang terhubung dengan perangkat perekam
						EEG melalui Bluetooth. Pengguna dapat merekam dan menganalisis
						sinyal otak dengan mudah serta mengakses catatan perekaman. Aplikasi
						ini juga menyertakan audio binaural beats dan ambient sounds seperti
						ombak, hujan, api, dan kicau burung untuk menciptakan lingkungan
						tenang. Dengan fokus pada kenyamanan dan integrasi, BRAINWAVE
						memberikan pengalaman yang unik untuk memantau aktivitas otak dan
						meningkatkan ketenangan pikiran pengguna.
					</Text>
					<Text className='text-base text-justify'>
						Aplikasi BRAINWAVE ini dibangun sebagai bagian dari syarat kelulusan
						Program Studi S1 Teknik Biomedis di Institut Teknologi Sumatera
						(Itera). Proyek ini merupakan hasil kolaborasi dari tim pengembang
						yang terdiri dari Lucky Septiana Putri (120430056), Azdni Selviana
						Aprilia (120430003), dan Adelia Putri (120430010), mahasiswa yang
						berkomitmen dalam menggabungkan pengetahuan teknis dengan keahlian
						dalam teknologi medis.
					</Text>
					<View className=' flex flex-row justify-end gap-3 my-3'>
						<View>
							<Image
								source={logoItera}
								className='w-16 h-16'
							/>
						</View>
						<View>
							<Image
								source={logoBm}
								className='w-16 h-16'
							/>
						</View>
					</View>
				</View>
			</View>
		</SafeAreaView>
	)
}
