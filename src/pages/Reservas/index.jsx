import * as Yup from 'yup'

import { Form, Formik } from 'formik'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import { GET_RESERVA_BY__ID_RESERVA } from '@/const'
import Header from '@/components/Header'
import InfoReserva from './InfoReserva'
import OtpInput from 'react-simple-otp'
import { Typography } from '@mui/material'
import useFetch from '@/hooks/useFetch'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

const Reservas = () => {
	const [queryParams] = useState(new URLSearchParams(useLocation().search))
	const idreserva = queryParams.get('idreserva')

	const [idReserva, setIdReserva] = useState(idreserva ?? '')

	const [otp, setOtp] = useState('')

	const url = GET_RESERVA_BY__ID_RESERVA(idReserva)
	const { data: reserva } = useFetch(url)

	const initialValues = {
		idReserva: '',
	}

	const validationSchema = Yup.object({
		idReserva: Yup.string().required('El numero de reserva es obligatorio'),
	})

	const onSubmit = (value) => {
		setIdReserva(value)
	}

	return (
		<Box>
			<Header />
			<Box></Box>
			<Box sx={{ px: 5, py: 2 }}>
				<Container maxWidth="xl">
					<Box component="div" sx={{ px: 5, py: 3, boxShadow: 3, backgroundColor: 'background.default' }}>
						<Typography
							variant="h4"
							component="h1"
							fontWeight="300"
							style={{
								color: 'transparent',
								backgroundImage: 'linear-gradient(90deg, hsl(270, 95%, 60%) 0%, hsl(270, 85%, 40%)',
								WebkitBackgroundClip: 'text',
								backgroundClip: 'text',
							}}
						>
							Gestion y consulta de reservas.
						</Typography>

						<Typography variant="body1" component="p" color="rgba(0, 0, 0, 0.87)">
							Introduzca el codigo de la reserva para acceder.
						</Typography>

						<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
							<Form className="flex items-center gap-6">
								<OtpInput
									value={otp}
									length={8}
									inputStyle={{
										margin: '0 0.25em',
										border: '1px solid rgba(0, 0, 0, 0.15)',
										borderRadius: '8px',
										width: '54px',
										height: '54px',
										fontSize: '1em',
										textAlign: 'center',
										color: '#000',
										fontWeight: '300',
										outline: 'none',
									}}
									focusStyle={{
										border: '1px solid #6b05d1',
									}}
									onSubmit={
										(value) => onSubmit(value) //otp value on enter/return key
									}
									enableClearAll={true} //enables clear button right to the input fields
									clearAllButton={
										<Button variant="outlined" type="button">
											Borrar
										</Button>
									} //Button text for the clear all button
									autoFocus={true} //enable Autofocus on the first input field on page load
									onChange={(value) => {
										setOtp(value)
									}}
								/>

								{/* <InputField name="idReserva" label="Identificador de la reserva" variant="standard" /> */}
							</Form>
						</Formik>
						{reserva && <InfoReserva reserva={reserva} />}
					</Box>
				</Container>
			</Box>
		</Box>
	)
}
export default Reservas
