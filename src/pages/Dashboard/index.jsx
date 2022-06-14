import { Box, Stack } from '@mui/material'
import { useEffect, useState } from 'react'

import { GoogleChart } from '@/components/Charts/GoogleChart'
import Header from '@/components/Header'
import InputDateTime from '@/components/InputDateTime'
import InputField from '@/components/InputField'
import Menu from './Menu'
import NewVueloForm from './NewVueloForm'
import axios from 'axios'
import useProgramas from '@/hooks/useProgramas'

export const matrixData = [['Country', 'Population', 'Area']]

const options = {
	method: 'GET',
	url: 'https://restcountries.com/v3.1/all',
}

export const optionsMap = {
	colorAxis: { colors: ['#dfbdff', '#5e00b5'] },
	backgroundColor: '#d4f1ff',
	datalessRegionColor: '#f1e6ea',
	defaultColor: '#f5f5f5',
}

const Dashboard = () => {
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		axios
			.request(options)
			.then(function (res) {
				const data = res.data
				data.map(({ name, population, area }) => {
					matrixData.push([name.common, population, area])
				})
			})
			.catch(function (error) {
				console.error(error)
			})
			.finally(function () {
				setLoading(false)
			})
	}, [])

	return (
		<Box>
			<Stack direction="row" spacing={2}>
				<Menu />
				<Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
					<Box>
						<Header />

						<Box
							sx={{ p: 6 }}
							style={{ backgroundColor: 'background.paper', boxShadow: 'inset 0 0 5px hsla(0, 0%, 0%, 0.1)' }}
						>
							<Box sx={{ my: 2 }}>
								<NewVueloForm />
							</Box>

							{!loading && <GoogleChart data={matrixData} />}
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	)
}

export default Dashboard
