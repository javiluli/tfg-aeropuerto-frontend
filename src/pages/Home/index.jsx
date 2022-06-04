import Box from '@mui/material/Box'
import BuscarVuelos from '@/components/Forms/BuscarVuelos'
import Container from '@mui/material/Container'
import Header from '@/components/Header'
import Typography from '@mui/material/Typography'

const Home = () => {
	return (
		<Box>
			<Header />

			<Box sx={{ px: 5, py: 10 }}>
				<Container maxWidth="xl">
					<Box component="div" sx={{ px: 5, py: 3, boxShadow: 3, backgroundColor: 'background.default' }}>
						<Typography
							align="left"
							variant="h3"
							component="h1"
							fontWeight="700"
							style={{
								color: 'transparent',
								backgroundImage: 'linear-gradient(90deg, hsl(270, 95%, 60%) 0%, hsl(270, 85%, 40%)',
								WebkitBackgroundClip: 'text',
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
	)
}
export default Home
