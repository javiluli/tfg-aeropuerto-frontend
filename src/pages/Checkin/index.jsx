import * as Yup from 'yup'

import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'

import Asientos from './asientos'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Header from '@/components/Header'
import InputField from '@/components/InputField'
import Typography from '@mui/material/Typography'
import useFetch from '@/hooks/useFetch'

const URL_BASE = 'http://localhost:8080/api/v1'

const Checkin = () => {
	// obtener pasajero a los pertenece la reserva
	const [idReserva, setIdReserva] = useState(null)

	const { data: reserva } = useFetch(`${URL_BASE}/reserva/${idReserva}`)

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

	return (
		<Box>
			<Header />

			<Box sx={{ px: 5, py: 2 }}>
				<Container maxWidth="xl">
					<Box component="div" sx={{ px: 5, py: 3, boxShadow: 3, backgroundColor: 'background.default' }}>
						<Typography
							align="left"
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

						{reserva && <Asientos reserva={reserva} />}
					</Box>
				</Container>
			</Box>
		</Box>
	)
}

export default Checkin
