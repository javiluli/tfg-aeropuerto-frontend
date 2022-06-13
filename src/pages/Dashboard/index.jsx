import { Box, Stack } from '@mui/material'

import { GoogleChart } from '@/components/Charts/GoogleChart'
import Header from '@/components/Header'
import InputDateTime from '@/components/InputDateTime'
import InputField from '@/components/InputField'
import Menu from './Menu'
import useProgramas from '@/hooks/useProgramas'
import { useState } from 'react'

const Dashboard = () => {
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
							<GoogleChart />
						</Box>
					</Box>
				</Box>
			</Stack>
		</Box>
	)
}

export default Dashboard
