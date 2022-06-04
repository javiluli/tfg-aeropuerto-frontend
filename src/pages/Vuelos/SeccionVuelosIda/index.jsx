import Box from '@mui/material/Box'
import { CircularProgress } from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import Container from '@mui/material/Container'
import FlightRoundedIcon from '@mui/icons-material/FlightRounded'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import ListOfVuelos from '@/components/ListOfVuelos'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

// hooks

const SeccionVuelosIda = ({ vuelos, setVueloIda }) => {
	function CancelarSeleccion() {
		const theme = useTheme()
		const matches = useMediaQuery(theme.breakpoints.up('sm'))

		return (
			<Grid item container direction="row" justifyContent="space-between" alignItems="center">
				<Typography variant="h5" component="p" color="text.secondary" sx={{ fontWeight: '300' }}>
					Tu vuelo de ida
				</Typography>

				<Box>
					{matches && (
						<Typography variant="body2" component="span" color="text.secondary" sx={{ fontWeight: '300' }}>
							Seleccionar otro vuelo
						</Typography>
					)}
					<IconButton color="error" size="large">
						<CloseRoundedIcon />
					</IconButton>
				</Box>
			</Grid>
		)
	}

	return (
		<>
			<Container maxWidth="lg" sx={{ p: 2 }}>
				<Grid container spacing={4}>
					<Grid item xs={12} container justifyContent="space-between" alignItems="center">
						<Grid item container alignItems="center">
							<FlightRoundedIcon sx={{ color: '#8717ff', fontSize: 40, transform: 'rotate(90deg)' }} />

							<Typography
								variant="h4"
								component="h2"
								fontWeight="400"
								ml={2}
								style={{
									color: 'transparent',
									marginRight: '0.25em',
									backgroundImage: 'linear-gradient(90deg, rgba(135,23,255,1) 0%, rgba(96,0,199,1) 100%)',
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
								}}
							>
								Seleccione un vuelo de ida
							</Typography>
						</Grid>

						{/* {CancelarSeleccion()} */}
					</Grid>

					{vuelos !== null ? (
						<Grid item xs={12}>
							<ListOfVuelos
								vuelos={vuelos}
								radioName="vueloIda"
								onVueloSeleccted={(id) => setVueloIda(vuelos.find(({ vuelo }) => vuelo.idVuelo === id))}
							/>
						</Grid>
					) : (
						<CircularProgress />
					)}
				</Grid>
			</Container>
		</>
	)
}

export default SeccionVuelosIda
