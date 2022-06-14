import { Box } from '@mui/material'
import { Chart } from 'react-google-charts'
import axios from 'axios'
import { useState } from 'react'

// export const matrixData = [['Country', 'Population', 'Area']]

// const options = {
// 	method: 'GET',
// 	url: 'https://restcountries.com/v3.1/all',
// }

export const optionsMap = {
	colorAxis: { colors: ['#dfbdff', '#5e00b5'] },
	backgroundColor: '#d4f1ff',
	datalessRegionColor: '#f1e6ea',
	defaultColor: '#f5f5f5',
}

export function GoogleChart({ data }) {
	// const [loading, setLoading] = useState(true)

	// axios
	// 	.request(options)
	// 	.then(function (res) {
	// 		const data = res.data
	// 		data.map(({ name, population, area }) => {
	// 			matrixData.push([name.common, population, area])
	// 		})

	// 		setLoading(false)
	// 	})
	// 	.catch(function (error) {
	// 		console.error(error)
	// 	})

	return (
		<Box sx={{ px: 4, py: 5, bgcolor: '#d4f1ff', borderRadius: 4 }}>
			<Chart
				chartEvents={[
					{
						eventName: 'select',
						callback: ({ chartWrapper }) => {
							const chart = chartWrapper.getChart()
							const selection = chart.getSelection()
							if (selection.length === 0) return
							const region = data[selection[0].row + 1]
							console.log('Selected : ' + region)
						},
					},
				]}
				chartType="GeoChart"
				width="100%"
				height="400px"
				data={data}
				options={optionsMap}
			/>
		</Box>
	)
}
