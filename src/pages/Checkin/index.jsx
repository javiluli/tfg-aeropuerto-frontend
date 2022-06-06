import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import InputField from '@/components/InputField/InputField'
import Typography from '@mui/material/Typography'
import crearCheckin from '@/services/crearCheckin'
import getAllCheckinByNombreModelo from '@/services/getAllCheckinByNombreModelo'
import getFilasByNombreModelo from '@/services/getFilasByNombreModelo'
import getPasajeroConReserva from '@/services/getPasajeroConReserva'

const checkin = (idVuelo, nombreModelo, numeroFila, letraAsiento) => {
	return {
		idVuelo,
		nombreModelo,
		numeroFila,
		letraAsiento,
	}
}

const Reservas = () => {
	const [pasajero, setPasajero] = useState(null)
	const [idReserva, setIdReserva] = useState(null)
	const [modeloAvion, setModeloAvion] = useState(null)
	const [allCkeckins, setAllCkeckins] = useState([])

	const [filas, setFilas] = useState([])
	const [butacas, setButacas] = useState([])

	const [selectdButaca, setSelectdButaca] = useState(null)

	const [nombreModelo, setNombreModelo] = useState(null)
	const [idVuelo, setIdVuelo] = useState(null)

	const initialValues = {
		idReserva: '',
	}

	const validationSchema = Yup.object({
		idReserva: Yup.string().required('El codigo de reserva es obligatorio'),
	})

	const onSubmit = (values, { setSubmitting }) => {
		setSubmitting(false)
		const { idReserva } = values
		setIdReserva(idReserva)
	}

	useEffect(() => {
		getPasajeroConReserva(idReserva).then((pasajero) => {
			const { nombre, apellidos, dni, email, reserva } = pasajero
			const { vuelo } = reserva
			const { idVuelo, avion, fechaSalida, horaSalida, fechaLlegada, horaLlegada } = vuelo
			const { modeloAvion, matriculaAvion } = avion
			const { nombreModelo } = modeloAvion

			setPasajero(pasajero)
			setModeloAvion(nombreModelo)
			setNombreModelo(nombreModelo)
			setIdVuelo(idVuelo)
		})
	}, [idReserva])

	useEffect(() => {
		if (nombreModelo !== null && idVuelo !== null) {
			getAllCheckinByNombreModelo(nombreModelo, idVuelo).then((checkins) => {
				setAllCkeckins(checkins)
			})
		}
	}, [nombreModelo, idVuelo])

	useEffect(() => {
		getFilasByNombreModelo(modeloAvion).then((modeloAvion) => {
			const { numeroFila, cantidadAsientos } = modeloAvion
			setFilas(crearFilas(numeroFila))
			setButacas(crearButacas(cantidadAsientos))
		})
	}, [modeloAvion])

	const guardaCheckin = () => {
		if (pasajero !== null) {
			const { nombre, apellidos, dni, email, reserva } = pasajero
			const { vuelo } = reserva
			const { idVuelo, avion, fechaSalida, horaSalida, fechaLlegada, horaLlegada } = vuelo
			const { modeloAvion, matriculaAvion } = avion
			const { nombreModelo } = modeloAvion
			const letrayNumeroDeAsiento = selectdButaca.split('-')

			const newCheckin = checkin(idVuelo, nombreModelo, letrayNumeroDeAsiento[1], letrayNumeroDeAsiento[0])

			crearCheckin(newCheckin)
		}
	}

	return (
		<Box>
			<Header />

			<Box sx={{ px: 5, py: 4 }}>
				<Container maxWidth="xl">
					<Box component="div" sx={{ px: 5, py: 3, boxShadow: 3, backgroundColor: 'background.default' }}>
						<Typography
							align="left"
							variant="h3"
							component="h1"
							fontWeight="300"
							style={{
								color: 'transparent',
								backgroundImage: 'linear-gradient(90deg, hsl(270, 95%, 60%) 0%, hsl(270, 85%, 40%)',
								WebkitBackgroundClip: 'text',
								backgroundClip: 'text',
							}}
						>
							Hacer Check-in
						</Typography>

						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form className="flex items-center gap-6">
								<InputField name="idReserva" label="Identificador de la reserva" variant="standard" />

								<Button variant="contained" type="submit">
									Buscar
								</Button>
							</Form>
						</Formik>

						<Box my={3}>
							{selectdButaca !== null ? (
								<Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
									<Grid item>
										<Button variant="outlined" type="button" color="error" onClick={() => setSelectdButaca(null)}>
											Cancelar
										</Button>
									</Grid>
									<Grid item>
										<Button variant="contained" type="button" onClick={() => guardaCheckin()}>
											Guardar asiento
										</Button>
									</Grid>
								</Grid>
							) : null}
						</Box>

						{pasajero !== null ? (
							<Grid spacing={4} container direction="row" justifyContent="flex-end" alignItems="flex-start">
								<Grid item xs={12}>
									<Grid container direction="column">
										<Filas
											filas={filas}
											butacas={butacas}
											selectdButaca={selectdButaca}
											onButacaSelected={setSelectdButaca}
											allCkeckins={allCkeckins}
										/>
									</Grid>
								</Grid>
							</Grid>
						) : null}
					</Box>
				</Container>
			</Box>
		</Box>
	)
}
export default Reservas

const crearFilas = (n) => {
	const array = []
	const FIRST_ASCII = 65
	for (let i = 0; i < n; i++) {
		const element = FIRST_ASCII + i
		array.push(String.fromCharCode(element))
	}
	return array
}

const crearButacas = (n) => {
	const array = []
	for (let i = 1; i <= n; i++) {
		const element = i < 10 ? `0${i}` : `${i}`
		array.push(element)
	}
	return array
}

const Filas = ({ filas, butacas, selectdButaca, onButacaSelected, allCkeckins }) => {
	return (
		<Grid item container direction="row" spacing={4}>
			{filas.map((fila) => (
				<Fila
					fila={fila}
					butacas={butacas}
					selectdButaca={selectdButaca}
					onButacaSelected={onButacaSelected}
					allCkeckins={allCkeckins}
				/>
			))}
		</Grid>
	)
}

const Fila = ({ fila, butacas, selectdButaca, onButacaSelected, allCkeckins }) => {
	return (
		<Grid item container direction="row">
			<Butacas
				fila={fila}
				butacas={butacas}
				selectdButaca={selectdButaca}
				onButacaSelected={onButacaSelected}
				allCkeckins={allCkeckins}
			/>
		</Grid>
	)
}

const Butacas = ({ fila, butacas, selectdButaca, onButacaSelected, allCkeckins }) => {
	const asientos = allCkeckins.map((obj) => {
		const { letraAsiento, numeroFila } = obj
		return `${letraAsiento}-${numeroFila}`
	})

	return (
		<Grid item container direction="row" justifyContent="space-between" alignItems="center">
			{butacas.map((butaca) =>
				asientos.includes(`${fila}-${butaca}`) ? (
					<Butaca key={butaca} text={`${fila}-${butaca}`} color="hsl(0, 100%, 75%)" />
				) : (
					<Butaca
						key={butaca}
						id={`${fila}-${butaca}`}
						text={`${fila}-${butaca}`}
						selectdButaca={selectdButaca}
						onClick={() => onButacaSelected(`${fila}-${butaca}`)}
					/>
				)
			)}
		</Grid>
	)
}

const Butaca = ({ id, text, color, ...props }) => {
	const bgColor = props.selectdButaca === id ? 'hsl(60, 100%, 75%)' : 'hsl(90, 100%, 75%)'

	return (
		<Grid item>
			<Box
				component="button"
				sx={{
					width: 60,
					height: 60,
					backgroundColor: color ?? bgColor,
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
				}}
				{...props}
			>
				{text}
			</Box>
		</Grid>
	)
}
