import { Route, Routes } from 'react-router-dom'

import { Box } from '@mui/material'
import Checkin from '@/pages/Checkin'
import Home from '@/pages/Home'
import Reservas from '@/pages/Reservas'
import Vuelos from '@/pages/Vuelos'

// Pages

function App() {
	return (
		<Box className="App" sx={{ backgroundColor: 'background.paper' }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vuelos" element={<Vuelos />} />
				<Route path="/gestion-reservas" element={<Reservas />} />
				<Route path="/check-in" element={<Checkin />} />
			</Routes>
		</Box>
	)
}

export default App
