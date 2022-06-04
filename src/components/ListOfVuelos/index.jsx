import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import FlightRoundedIcon from '@mui/icons-material/FlightRounded'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Radio from '@mui/material/Radio'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import { useField } from 'formik'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

function LineLeft() {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))

	return (
		matches && (
			<Grid container alignItems="center">
				<span className="block w-24 h-0.5 mx-2 bg-[#e6e6e6]"></span>
			</Grid>
		)
	)
}

function LineRight() {
	const theme = useTheme()
	const matches = useMediaQuery(theme.breakpoints.up('sm'))

	return (
		matches && (
			<Grid item>
				<Grid container alignItems="center">
					<Box component="span" className="block w-24 h-0.5 mx-2 bg-[#e6e6e6]"></Box>
					<FlightRoundedIcon sx={{ color: '#8717ff', fontSize: 20, transform: 'rotate(90deg)' }} />
				</Grid>
			</Grid>
		)
	)
}

const SuccessSlider = styled(Radio)(({ theme }) => ({
	width: 300,
	color: theme.palette.success.main,
	'& .MuiSlider-thumb': {
		'&:hover, &.Mui-focusVisible': {
			boxShadow: `0px 0px 0px 8px ${alpha(theme.palette.success.main, 0.16)}`,
		},
		'&.Mui-active': {
			boxShadow: `0px 0px 0px 14px ${alpha(theme.palette.success.main, 0.16)}`,
		},
	},
}))

const MyRadio = ({ label, onclick, ...props }) => {
	const [field] = useField(props)
	return <FormControlLabel control={<Radio />} label={label} {...field} onClick={onclick} />
}

function ListOfVuelos({ vuelos, onVueloSeleccted, radioName }) {
	return (
		<Stack spacing={{ xs: 2, md: 5 }}>
			{vuelos.map(({ vuelo, cantidadEscalas, plazasLibres }) => (
				<Paper
					sx={{ p: 4 }}
					elevation={0}
					fullWidth
					style={{
						borderRadius: '1.25em',
						boxShadow: '0px 0px 15px 0px hsla(0, 0%, 0%, 0.1) ',
					}}
				>
					<Grid container justifyContent="space-around" spacing={2}>
						<Grid item container xs={12} md={8} direction="row" justifyContent="space-between" alignItems="center">
							<Grid item>
								<Grid container direction="column" justifyContent="flex-start" alignItems="start">
									<Typography variant="h5" component="span" color="text.secondary" sx={{ fontWeight: '100' }}>
										{vuelo.horaSalida.slice(0, 5)}
									</Typography>

									<Typography variant="body2" component="span" color="text.secondary" sx={{ fontWeight: '100' }}>
										{vuelo.programa.origen.idAeropuerto}
									</Typography>
								</Grid>
							</Grid>
							<Grid item>{LineLeft()}</Grid>
							<Grid item>
								<Grid container direction="column" justifyContent="space-between" alignItems="center">
									<Typography align="center" variant="subtitle1" component="span" color="text.secondary">
										{cantidadEscalas === '0'
											? 'DIRECTO'
											: cantidadEscalas === '1'
											? `${cantidadEscalas} escala`
											: `${cantidadEscalas} escalas`}
									</Typography>
									<Typography variant="subtitle2" component="span" color="text.secondary" sx={{ fontWeight: '100' }}>
										{diffFechasYHoras(vuelo.fechaSalida, vuelo.horaSalida, vuelo.fechaLlegada, vuelo.horaLlegada)}
									</Typography>
								</Grid>
							</Grid>
							<Grid item>{LineRight()}</Grid>
							<Grid item>
								<Grid container direction="column" justifyContent="space-between" alignItems="end">
									<Typography variant="h5" component="span" color="text.secondary" sx={{ fontWeight: '100' }}>
										{vuelo.horaLlegada.slice(0, 5)}
									</Typography>

									<Typography variant="body2" component="span" color="text.secondary" sx={{ fontWeight: '100' }}>
										{vuelo.programa.destino.idAeropuerto}
									</Typography>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12} md={4} align="center">
							<MyRadio
								name={radioName}
								type="radio"
								value={vuelo.idVuelo}
								onclick={() => onVueloSeleccted(vuelo.idVuelo)}
							/>
						</Grid>
					</Grid>
				</Paper>
			))}
		</Stack>
	)
}

export default ListOfVuelos

function diffFechasYHoras(fSalida, hSalida, fLlegada, hLlegada) {
	const salida = new Date(`${fSalida}T${hSalida}`)
	const llegada = new Date(`${fLlegada}T${hLlegada}`)

	const milliseconds = llegada - salida

	let seconds = Math.floor((milliseconds / 1000) % 60)
	let minutes = Math.floor((milliseconds / (1000 * 60)) % 60)
	let hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)
	const days = Math.floor((milliseconds / (1000 * 60 * 60 * 24)) % 24)

	hours = hours < 10 ? '0' + hours : hours
	minutes = minutes < 10 ? '0' + minutes : minutes
	seconds = seconds < 10 ? '0' + seconds : seconds

	return `
		${days > 0 ? `${days + 'd'}` : ''} 
		${hours > 0 ? `${hours + 'h'}` : ''}
		${minutes > 0 ? `${minutes + 'm'}` : ''}
	`
}

// {
// 	"idVuelo": "3087582f-d9be-11ec-9ce4-309c23143d13",
// 	"programa": {
// 			"idPrograma": "007",
// 			"aerolinea": {
// 					"idAerolinea": "7",
// 					"nombre": "Spanair"
// 			},
// 			"origen": {
// 					"idAeropuerto": "MAD",
// 					"nombre": "Barajas",
// 					"ciudad": "Madrid",
// 					"pais": "España"
// 			},
// 			"destino": {
// 					"idAeropuerto": "BAR",
// 					"nombre": "El Prat",
// 					"ciudad": "Barcelona",
// 					"pais": "España"
// 			}
// 	},
// 	"fechaSalida": "2022-05-23",
// 	"horaSalida": "04:31:00",
// 	"fechaLlegada": "2022-05-22",
// 	"horaLlegada": "07:56:00",
// 	"plazasOcupadas": 0,
// 	"avion": {
// 			"matriculaAvion": "EC-BBB",
// 			"modeloAvion": {
// 					"nombreModelo": "Airbus319",
// 					"capacidad": 32
// 			}
// 	}
// },
