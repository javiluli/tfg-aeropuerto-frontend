import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded'
import Autocomplete from '@mui/material/Autocomplete'

// hooks
import useAeropuertos from '@/hooks/useAeropuertos'

// @/const
import { villetes, mensajes } from '@/const/index'

// @/components
import CustomSelect from '@/components/Select'
import SelectAutocomplete from '@/components/SelectAutocomplete'
import CustomButton from '@/components/Button'

const CssTextField = styled(TextField)({
	'& label.Mui-focused': {
		color: '#8717ff',
	},
	'& .MuiInput-underline:after': {
		borderBottomColor: '#8717ff',
	},
	'& .MuiOutlinedInput-root': {
		'& fieldset': {
			borderColor: 'red',
		},
		'&.Mui-focused fieldset': {
			borderColor: '#8717ff',
		},
	},
})

const BuscarVuelos = () => {
	const navigate = useNavigate()
	const [villete, setVilelte] = useState(villetes.IDA_Y_VUELTA)
	const { aeropuertos } = useAeropuertos()

	const validationSchema = yup.object({
		origen: yup.string().required(mensajes.ELIGE_CIUDAD_ORIGEN),
		destino: yup.string().required(mensajes.ELIGE_CIUDAD_DESTINO),
		fIda: yup.string().required(mensajes.SELECCIONAR_FECHA_IDA),
		fVuelta: villete === villetes.IDA_Y_VUELTA ? yup.string().required(mensajes.SELECCIONAR_FECHA_VUELTA) : null,
		pasajeros: yup
			.number('Debe ser un numero')
			.positive('Debe ser mayor de 0')
			.integer('Debe ser un numero sin decimales')
			.min(1, mensajes.MAXIMO_PASAJEROS)
			.max(5, mensajes.MAXIMO_PASAJEROS)
			.required(mensajes.MAXIMO_PASAJEROS),
	})

	const formik = useFormik({
		initialValues: {
			origen: '',
			destino: '',
			fIda: '2022-01-01', // fecha actual
			fVuelta: '',
			pasajeros: '1',
		},

		validationSchema: validationSchema,
		onSubmit: (values) => {
			let busqueda = Object.entries(values)
				.map((entry) => {
					const [key, value] = entry
					// en caso de que la busqueda sea para SOLO IDA la URL no incluye la fecha de vuelta
					if (key === 'fVuelta' && villete === villetes.SOLO_IDA) return ''
					return `${key}=${value}&`
				})
				.join('')
			busqueda = busqueda.slice(0, busqueda.length - 1)
			navigate(`/vuelos?${busqueda}`)
		},
	})

	return (
		<Box component="div">
			<form onSubmit={formik.handleSubmit}>
				<Grid container rowSpacing={{ xs: 4, lg: 2 }} rows={{ xs: 1, lg: 2 }} columnSpacing={{ xs: 4, lg: 2 }}>
					<Grid item xs={12} md={6} lg={2} order={{ xs: 1, lg: 1 }}>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							{aeropuertos !== null ? <SelectAutocomplete id="origen" data={aeropuertos} formik={formik} /> : null}
						</Box>
					</Grid>
					<Grid item xs={12} md={6} lg={2} order={{ xs: 2, lg: 2 }}>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							{aeropuertos !== null ? <SelectAutocomplete id="destino" data={aeropuertos} formik={formik} /> : null}
						</Box>
					</Grid>
					<Grid item xs={12} order={{ xs: 3, lg: 6 }}>
						<CustomSelect name="villete" villete={setVilelte} />
					</Grid>
					<Grid item xs={12} lg={4} order={{ xs: 4, lg: 3 }}>
						<Grid container>
							<Grid item xs={villete == villetes.IDA_Y_VUELTA ? 6 : 12} lg={villete == villetes.IDA_Y_VUELTA ? 6 : 12}>
								<CssTextField
									fullWidth
									id="fIda"
									name="fIda"
									type="date"
									label="Fecha de ida"
									variant="standard"
									size="small"
									value={formik.values.fIda}
									onChange={formik.handleChange}
									error={formik.touched.fIda && Boolean(formik.errors.fIda)}
									helperText={formik.touched.fIda && formik.errors.fIda}
									InputLabelProps={{
										shrink: true,
									}}
								/>
							</Grid>

							{villete == villetes.IDA_Y_VUELTA ? (
								<Grid item xs={6}>
									<CssTextField
										fullWidth
										id="fVuelta"
										name="fVuelta"
										type="date"
										label="Fecha de vuelta"
										variant="standard"
										size="small"
										value={formik.values.fVuelta}
										onChange={formik.handleChange}
										error={formik.touched.fVuelta && Boolean(formik.errors.fVuelta)}
										helperText={formik.touched.fVuelta && formik.errors.fVuelta}
										InputLabelProps={{
											shrink: true,
										}}
									/>
								</Grid>
							) : null}
						</Grid>
					</Grid>
					<Grid item xs={12} md={6} lg={2} order={{ xs: 5, lg: 4 }}>
						<Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
							<CssTextField
								fullWidth
								id="pasajeros"
								name="pasajeros"
								label="Numero de pasajeros"
								type="text"
								variant="standard"
								size="small"
								value={formik.values.pasajeros}
								onChange={formik.handleChange}
								error={formik.touched.pasajeros && Boolean(formik.errors.pasajeros)}
								helperText={formik.touched.pasajeros && formik.errors.pasajeros}
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<AccountCircleRoundedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
						</Box>
					</Grid>
					<Grid item xs={12} lg={2} order={{ xs: 6, lg: 5 }}>
						<CustomButton text="Buscar" />
					</Grid>
				</Grid>
			</form>
		</Box>
	)
}

export default BuscarVuelos
