import * as yup from 'yup'

import { Grid, Typography } from '@mui/material'
import MultiStepForm, { FormStep } from './MultiStepForm'

import Box from '@mui/material/Box'
import Container from '@mui/system/Container'
import Header from '@/components/Header'
import QRCode from 'react-qr-code'
import SeccionRegistros from './SeccionRegistros'
import SeccionVuelosIda from './SeccionVuelosIda'
import SeccionVuelosVuelta from './SeccionVuelosVuelta'
import crearReserva from '@/services/crearReserva'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import useVuelos from '@/hooks/useBusquedaVuelos'

const validationSchemaVueloIda = yup.object({
	vueloIda: yup.string().required(),
})

const validationSchemaVueloVuelta = yup.object({
	vueloVuelta: yup.string().required(),
})

const validationSchemaDatosPasajeros = yup.object({
	nombre: yup.string().required('El nombre es obligatorio'),
	apellidos: yup.string().required('Al menos un apellido'),
	dni: yup.string().required('El DNI es obligatorio'),
	email: yup.string().email().required('El E-mail es obligatorio'),
})

const validationSchemas = {
	VSVueloIda: validationSchemaVueloIda,
	VSVueloVuelta: validationSchemaVueloVuelta,
	VSPasajeros: validationSchemaDatosPasajeros,
}

const initialValues = {
	vueloIda: '',
	vueloVuelta: null,
	nombre: '',
	apellidos: '',
	dni: '',
	email: '',
}

const Vuelos = () => {
	const [queryParams] = useState(new URLSearchParams(useLocation().search))
	const origen = queryParams.get('origen')
	const destino = queryParams.get('destino')
	const fechaIda = queryParams.get('fIda')
	const fechaVuelta = queryParams.get('fVuelta')
	const pasajeros = queryParams.get('pasajeros')

	const vuelosIda = useVuelos(origen, destino, fechaIda)
	const vuelosVuelta = useVuelos(destino, origen, fechaIda)

	const [vueloIda, setVueloIda] = useState(null)
	const [vueloVuelta, setVueloVuelta] = useState(null)

	const [reservadoIda, setReservadoIda] = useState(false)
	const [reservadoVuelta, setReservadoVuelta] = useState(false)

	const [idReservaIda, setIdReservaIda] = useState(false)
	const [idReservaVuelta, setIdReservaVuelta] = useState(false)

	return (
		<Grid container spacing={6}>
			<Grid item xs={12}>
				<Header />
			</Grid>

			<Grid item xs={12}>
				<Container>
					<MultiStepForm
						initialValues={initialValues}
						onSubmit={(values) => {
							handleSubmit(values, setIdReservaIda, setIdReservaVuelta)
							setReservadoIda(true)
							vueloVuelta ? setReservadoVuelta(true) : null
						}}
					>
						{/* Vuelos de ida */}
						<FormStep stepName="Seleccion de ida" validationSchema={validationSchemas['VSVueloIda']}>
							<SeccionVuelosIda vuelos={vuelosIda} setVueloIda={setVueloIda} />
						</FormStep>

						{/* Vuelos de vuelta */}
						{fechaVuelta !== null ? (
							<FormStep stepName="Seleccion de vuelta" validationSchema={validationSchemas['VSVueloVuelta']}>
								<SeccionVuelosVuelta vuelos={vuelosVuelta} setVueloVuelta={setVueloVuelta} />
							</FormStep>
						) : null}

						{/* Informacion de los pasajeros */}
						<FormStep stepName="Datos de pasajeros" validationSchema={validationSchemas['VSPasajeros']}>
							<SeccionRegistros />
						</FormStep>

						{/* Resumen de la reserva */}
						<FormStep stepName="Resumen">
							<Typography
								align="left"
								variant="h5"
								component="h1"
								fontWeight="700"
								style={{
									color: 'transparent',
									marginBottom: '1em',
									backgroundImage: 'linear-gradient(90deg, rgba(135,23,255,1) 0%, rgba(96,0,199,1) 100%)',
									backgroundClip: 'text',
								}}
							>
								Resumen de la reserva
							</Typography>

							<Grid container spacing={2}>
								{vueloIda !== null ? (
									<Grid
										item
										container
										direction="row"
										justifyContent="center"
										alignItems="center"
										xs={12}
										md={6}
										style={{
											padding: '1em',
											backgroundColor: 'white',
											boxShadow: '0 0 10px hsla(0, 0%, 0%, 0.1)',
											borderRadius: '1em',
										}}
									>
										<Grid xs={6} md={6}>
											<Box>
												<Typography align="left" variant="h5" component="h2">
													Ida
												</Typography>

												<Typography align="left" variant="body2" component="p">
													{vueloIda.vuelo.programa.origen.ciudad} - {vueloIda.vuelo.programa.destino.ciudad}
												</Typography>

												<Typography align="left" variant="body1" component="p">
													{vueloIda.vuelo.fechaSalida} / {vueloIda.vuelo.horaSalida}
												</Typography>

												<Typography align="left" variant="body1" component="p">
													{vueloIda.vuelo.programa.origen.nombre} - {vueloIda.vuelo.programa.origen.nombre}
												</Typography>
											</Box>
										</Grid>

										<Grid item xs={6} md={6}>
											{reservadoIda ? (
												<Box>
													<Box style={{ height: 'auto', margin: '0 auto', maxWidth: 128, width: '100%' }}>
														<QRCode
															size={256}
															style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
															value={`https://proyecto-beyond.netlify.app/reserva?idreserva=${idReservaIda}`}
															viewBox={`0 0 256 256`}
														/>
													</Box>
												</Box>
											) : null}
										</Grid>
									</Grid>
								) : null}

								{vueloVuelta !== null ? (
									<Grid
										item
										container
										direction="row"
										justifyContent="center"
										alignItems="center"
										xs={12}
										md={6}
										style={{
											padding: '1em',
											backgroundColor: 'white',
											boxShadow: '0 0 10px hsla(0, 0%, 0%, 0.1)',
											borderRadius: '1em',
										}}
									>
										<Grid xs={6} md={6}>
											<Box>
												<Typography align="left" variant="h5" component="h2">
													Vuelta
												</Typography>

												<Typography align="left" variant="body2" component="p">
													{vueloVuelta.vuelo.programa.origen.ciudad} - {vueloVuelta.vuelo.programa.destino.ciudad}
												</Typography>

												<Typography align="left" variant="body1" component="p">
													{vueloVuelta.vuelo.fechaSalida} / {vueloVuelta.vuelo.horaSalida}
												</Typography>

												<Typography align="left" variant="body2" component="p">
													{vueloVuelta.vuelo.programa.origen.nombre} - {vueloVuelta.vuelo.programa.destino.nombre}
												</Typography>
											</Box>
										</Grid>
										<Grid xs={6} md={6}>
											{reservadoIda && (
												<Box>
													<div style={{ height: 'auto', margin: '0 auto', maxWidth: 128, width: '100%' }}>
														<QRCode
															size={256}
															style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
															value={`https://proyecto-beyond.netlify.app/reserva?idreserva=${idReservaVuelta}`}
															viewBox={`0 0 256 256`}
														/>
													</div>
												</Box>
											)}
										</Grid>
									</Grid>
								) : null}
							</Grid>

							{/* <Typography>Reserva completada! Su reserva se identifica con: {idReserva}</Typography> */}
						</FormStep>
					</MultiStepForm>
				</Container>
			</Grid>
		</Grid>
	)
}
export default Vuelos

function reservaObj(idReserva, idVuelo, fechaReserva) {
	return {
		idReserva,
		idVuelo,
		fechaReserva,
	}
}

function createPasajero(idReserva, nombre, apellidos, dni, email) {
	return {
		idReserva,
		nombre,
		apellidos,
		dni,
		email,
	}
}

const randomID = () => Math.random().toString(36).substring(2, 10)

const handleSubmit = (data, onIdReservaIda, onIdReservaVuelta) => {
	const { vueloIda, vueloVuelta, nombre, apellidos, dni, email } = data

	const idReservaIda = randomID()
	onIdReservaIda(idReservaIda)
	const newReservaIda = {
		reserva: reservaObj(idReservaIda, vueloIda, new Date()),
		pasajeros: [createPasajero(idReservaIda, nombre, apellidos, dni, email)],
	}
	crearReserva(newReservaIda)

	// si el tipo de villete es ida y vuelta o la fecha de vuelta no es nula
	if (vueloVuelta !== null) {
		const idReservaVuelta = randomID()
		onIdReservaVuelta(idReservaVuelta)
		const newReservaVuelta = {
			reserva: reservaObj(idReservaVuelta, vueloVuelta, new Date()),
			pasajeros: [createPasajero(idReservaVuelta, nombre, apellidos, dni, email)],
		}
		crearReserva(newReservaVuelta)
	}
}
