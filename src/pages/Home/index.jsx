import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// @/components
import Header from '@/components/Header'
import BuscarVuelos from '@/components/Forms/BuscarVuelos'

const Home = () => {
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
								Buscar vuelos
							</Typography>

							<BuscarVuelos />
						</Box>
					</Container>
				</Box>
			</Box>
		</div>
	)
}
export default Home
