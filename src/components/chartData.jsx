import { useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { LineChart } from 'react-native-chart-kit'

import useFs from '../lib/fs'

export default function ChartData(props) {
  const { userId, recordId } = props
  const [chartData, setChartData] = useState([])
  const { readFile } = useFs()
  const getRecordsDataFormFile = async () => {

    // chenge the file name in here
    // need some logic to get all file name refer to the id
    const fileName = `recorde_${recordId}_${userId}`
    setChartData(await readFile(fileName))
    // console.log('recordsData:', recordsData
  }

  useEffect(() => {
    getRecordsDataFormFile()
  }, [])
  return (
      <ScrollView horizontal>
          <LineChart
              data={{ datasets: [{ data: chartData }] }}
              width={chartData.length * 5}
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
                                    // bezier
              style={{
                marginVertical: 8,
                padding: 0,
                borderRadius: 16
              }}
          />
      </ScrollView>
  )
}
