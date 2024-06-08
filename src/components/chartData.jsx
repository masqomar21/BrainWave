import { useEffect, useState } from 'react'
import { ScrollView, Alert } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import * as FileSystem from 'expo-file-system'
import * as Sharing from 'expo-sharing'
import BtnComp from './Button'

import useFs from '../lib/fs'

export default function ChartData(props) {
  const { userId, recordId, date } = props
  const [chartData, setChartData] = useState([])
  const { readFile } = useFs()
  const getRecordsDataFormFile = async () => {
    const fileName = `recorde_${recordId}_${userId}_${date}`
    setChartData(await readFile(fileName))
  }

  useEffect(() => {
    getRecordsDataFormFile()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const convertAndShareCSV = async () => {
    try {
      const csv = chartData.join(',\n')

      // Create a temporary file path
      const fileUri = `${FileSystem.cacheDirectory}recorde_${recordId}_${userId}_${date}.csv`

      // Write the CSV string to the file
      await FileSystem.writeAsStringAsync(fileUri, csv, {
        encoding: FileSystem.EncodingType.UTF8
      })

      // Share the file
      await Sharing.shareAsync(fileUri, {
        mimeType: 'text/csv',
        dialogTitle: 'Share CSV file'
      })

    } catch (error) {
      Alert.alert('Error', 'An error occurred while converting and sharing the CSV file.')
    }
  }
  return (
      <>
          <ScrollView horizontal>
              <LineChart
                  data={{ datasets: [{ data: chartData }] }}
                  width={chartData.length * 2}
                  height={200}
                  xAxisLabel="s"
                  withDots={false}
                  withInnerLines={false}
                  withShadow={false}
                  chartConfig={{
                    backgroundGradientFrom: '#f0f0f0',
                    backgroundGradientTo: '#d3d2dd',
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                      borderRadius: 16
                    }
                  }}
                  style={{
                    marginVertical: 8,
                    padding: 0,
                    borderRadius: 16
                  }}
              />
          </ScrollView>
          <BtnComp
              title="Share Data"
              onPress={() => convertAndShareCSV()}
              fluid="false"
          />
      </>
  )
}
