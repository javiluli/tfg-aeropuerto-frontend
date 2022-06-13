import { Route, Routes } from 'react-router-dom'

import { Box } from '@mui/material'
import BuscarVuelos from '@/pages/Vuelos'
import Checkin from '@/pages/Checkin'
import Dashboard from '@/pages/Dashboard'
import Home from '@/pages/Home'
import Layout from '@/pages/Layout.jsx'
import Login from '@/pages/Login'
import RequireAuth from '@/components/RequireAuth'
import Reservas from '@/pages/Reservas'
import Valoracion from '@/pages/Valoracion'

const ROLES = {
	User: 'user',
	Admin: 'admin',
}

function App() {
	return (
		<Box className="App" sx={{ backgroundColor: 'background.paper' }}>
			<Routes>
				<Route path="/" element={<Layout />}>
					{/* Rutas publicas */}
					<Route path="/" element={<Home />} />
					<Route path="/vuelos" element={<BuscarVuelos />} />
					<Route path="/reserva" element={<Reservas />} />
					<Route path="/checkin" element={<Checkin />} />
					<Route path="/login" element={<Login />} />
					<Route path="/valoracion" element={<Valoracion />} />

					{/* Rutas privadas del Admin */}
					<Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}></Route>
					<Route path="/dashboard" element={<Dashboard />} />
				</Route>
			</Routes>
		</Box>
	)
}

export default App
