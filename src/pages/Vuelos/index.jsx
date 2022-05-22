import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// @/components
import Header from '@/components/Header'

const Vuelos = () => {
	const [query, setQuery] = useState(new URLSearchParams(useLocation().search))

	const busqueda = {
		origen: query.get('origen'),
		destino: query.get('destino'),
		fIda: query.get('fIda'),
		fVuelta: query.get('fVuelta'),
		pasajeros: query.get('pasajeros'),
	}

	return (
		<div>
			<Header />

			<Box sx={{ position: 'relative', zIndex: 1000 }}>
				<Box sx={{ px: 2, my: 6 }}>
					<Container maxWidth="lg" sx={{ p: 2, boxShadow: 3 }}>
						<Box component="div">
							<Typography
								align="left"
								variant="h4"
								component="h1"
								fontWeight="700"
								style={{
									color: 'transparent',
									marginBottom: '1em',
									backgroundImage: 'linear-gradient(90deg, rgba(135,23,255,1) 0%, rgba(96,0,199,1) 100%)',
									backgroundClip: 'text',
								}}
							>
								Vuelos
							</Typography>

							{busqueda.origen}
							<hr></hr>
							{busqueda.destino}
							<hr></hr>
							{busqueda.fIda}
							<hr></hr>
							{busqueda.fVuelta}
							<hr></hr>
							{busqueda.pasajeros}
						</Box>
					</Container>
				</Box>
			</Box>
		</div>
	)
}
export default Vuelos
