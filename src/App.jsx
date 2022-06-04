import { Routes, Route } from 'react-router-dom'
import { Box } from '@mui/material'

// Pages
import Home from '@/pages/Home'
import Vuelos from '@/pages/Vuelos'

function App() {
	return (
		<Box className="App" sx={{ backgroundColor: 'background.paper' }}>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vuelos" element={<Vuelos />} />
			</Routes>
		</Box>
	)
}

export default App
