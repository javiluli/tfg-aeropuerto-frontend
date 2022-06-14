import * as yup from 'yup'

import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Stack } from '@mui/material'
import { Form, Formik } from 'formik'

import Header from '@/components/Header'
import InputDateTime from '@/components/InputDateTime'
import InputField from '@/components/InputField'
import Menu from './Menu'
import useProgramas from '@/hooks/useProgramas'
import { useState } from 'react'

function createVuelo(
	idPrograma,
	fechaSalida,
	horaSalida,
	fechaLlegada,
	horaLlegada,
	plazasOcupadas = 0,
	matriculaAvion
) {
	return {
		idPrograma,
		fechaSalida,
		horaSalida,
		fechaLlegada,
		horaLlegada,
		plazasOcupadas,
		matriculaAvion,
	}
}

const validationSchema = yup.object({
	programa: yup.string(),
	fechaYHoraalida: yup.string(),
})

const initialValues = {
	programa: '',
	fechaYHoraalida: 0,
}

const NewVueloForm = () => {
	const { programas } = useProgramas()

	const [programa, setPrograma] = useState('')
	const [fechaSalida, setFechaSalida] = useState('')
	const [horaSalida, setHoraSalida] = useState('')
	const [fechalegada, setFechalegada] = useState('')
	const [horaLlegada, setHoraLlegada] = useState('')
	const [plazasOcupadas, setPlazasOcupadas] = useState(0)
	const [matriculaAvion, setMatriculaAvion] = useState('')

	const handleChangePrograma = (event) => {
		setPrograma(event.target.value)
	}

	const handleSubmit = async (values) => {
		const newVuelo = createVuelo(programa, fechaSalida, horaSalida, fechalegada, horaLlegada, plazasOcupadas)
	}

	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
			<Form>
				<Box sx={{ px: 4, py: 5, bgcolor: 'background.default', borderRadius: 4 }}>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<FormControl sx={{ minWidth: 120 }} size="small">
								<InputLabel id="select-label-programa">Programa</InputLabel>
								<Select
									labelId="select-label-programa"
									id="demo-simple-programa"
									name="programa"
									value={programa}
									label="Programa"
									onChange={handleChangePrograma}
								>
									{programas &&
										programas.map(({ idPrograma, origen, destino }) => (
											<MenuItem key={idPrograma} value={idPrograma}>
												{origen.ciudad} ({origen.idAeropuerto}) - {destino.ciudad} ({destino.idAeropuerto})
											</MenuItem>
										))}
								</Select>
							</FormControl>
						</Grid>

						<Grid item xs={6}>
							<InputDateTime
								id="fechaSalida"
								name="fechaYHoraalida"
								label="Fecha y hora de salida"
								date={new Date()}
								minDate={new Date()}
								onChangeDate={setFechaSalida}
								onChangeTime={setHoraSalida}
							/>
						</Grid>

						<Grid item xs={6}>
							<InputDateTime
								id="fechaYHoraLlegada"
								name="fechaYHoraLlegada"
								label="Fecha y hora de llegada"
								date={new Date()}
								minDate={new Date(fechaSalida)}
								onChangeDate={setFechalegada}
								onChangeTime={setHoraLlegada}
							/>
						</Grid>

						<Grid item xs={12}>
							<InputField name="plazasOcupadas" label="Cantidad de plazas ocupadas" value="0" size="small" disabled />
						</Grid>

						{/* <Grid item xs={12}>
							<FormControl sx={{ minWidth: 120 }} size="small">
								<InputLabel id="select-label-matriculaAvion">Avion</InputLabel>
								<Select
									labelId="select-label-matriculaAvion"
									id="demo-simple-matriculaAvion"
									name="matriculaAvion"
									value={matriculaAvion}
									label="Avion"
									onChange={handleChangePrograma}
								>
								</Select>
							</FormControl>
						</Grid> */}

						<Grid item xs={12}>
							<Button type="submit" variant="contained">
								Grabar vuelo
							</Button>
						</Grid>
					</Grid>
				</Box>
			</Form>
		</Formik>
	)
}

export default NewVueloForm
