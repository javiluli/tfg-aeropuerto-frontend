import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import InputField from '@/components/InputField/InputField'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import eliminarReserva from '@/services/eliminarReserva'
import getPasajeroConReserva from '@/services/getPasajeroConReserva'

const Reservas = () => {
	const [pasajero, setPasajero] = useState(null)
	const [idReserva, setIdReserva] = useState(null)

	const initialValues = {
		idReserva: '',
	}

	const validationSchema = Yup.object({
		idReserva: Yup.string().required('El numero de reserva es obligatorio'),
	})

	const onSubmit = (values, { setSubmitting }) => {
		setSubmitting(false)
		const { idReserva } = values
		setIdReserva(idReserva)
	}

	useEffect(() => {
		getPasajeroConReserva(idReserva).then((pasajero) => {
			setPasajero(pasajero)
		})
	}, [idReserva])

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
							Gestion de reservas de vuelo
						</Typography>

						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form className="flex items-center gap-6">
								<InputField name="idReserva" label="Identificador de la reserva" variant="standard" />

								<Button variant="contained" type="submit">
									Buscar
								</Button>
							</Form>
						</Formik>

						{pasajero !== null ? (
							<Grid spacing={4} container direction="row" justifyContent="flex-end" alignItems="flex-start">
								<Grid item xs={12}>
									<CardOfReservaPasajero pasajero={pasajero} />
								</Grid>
								<Grid item>
									<Button variant="outlined" type="button" color="error" onClick={() => eliminarReserva(idReserva)}>
										Cancelar reserva
									</Button>
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

const CardOfReservaPasajero = ({ pasajero }) => {
	const { nombre, apellidos, dni, email, reserva } = pasajero
	const { vuelo } = reserva
	const { avion, fechaSalida, horaSalida, fechaLlegada, horaLlegada } = vuelo
	const { modeloAvion, matriculaAvion } = avion
	const { nombreModelo } = modeloAvion

	return (
		<Box>
			<Typography variant="h5" component="h2">
				Datos de la reserva
			</Typography>
			<TableContainer component={Paper} style={{ marginBottom: '2em' }}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Modelo de avion </TableCell>
							<TableCell>Matricula del avion </TableCell>
							<TableCell>Fecha y hora de salida</TableCell>
							<TableCell>Fecha y hora de llegada</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">
								{nombreModelo}
							</TableCell>
							<TableCell>{matriculaAvion}</TableCell>
							<TableCell>
								{fechaSalida} {horaSalida}
							</TableCell>
							<TableCell>
								{fechaLlegada} {horaLlegada}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>

			<Typography variant="h5" component="h2">
				Pasajeros
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableHead>
						<TableRow>
							<TableCell>Nombre </TableCell>
							<TableCell>Apellidos </TableCell>
							<TableCell>DNI</TableCell>
							<TableCell>E-mail</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
							<TableCell component="th" scope="row">
								{nombre}
							</TableCell>
							<TableCell>{apellidos}</TableCell>
							<TableCell>{dni}</TableCell>
							<TableCell>{email}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
