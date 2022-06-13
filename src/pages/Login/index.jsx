import * as yup from 'yup'

import { Form, Formik } from 'formik'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/system/Container'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import InputField from '@/components/InputField'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import useAuth from '@/hooks/useAuth'

function createUser(nombre, password) {
	return {
		nombre,
		password,
	}
}

const validationSchema = yup.object({
	nombre: yup.string().required(),
	password: yup.string().required(),
})

const initialValues = {
	nombre: '',
	password: '',
}

const Login = () => {
	const { setAuth } = useAuth()

	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/'

	// const [user, setUser] = useState(null)
	const [checked, setChecked] = useState(false)
	const [errorMsg, setErrorMsg] = useState(null)

	const handleChange = (event) => {
		setChecked(event.target.checked)
	}

	const handleSubmit = async (values) => {
		const { nombre, password } = values

		try {
			const respuesta = await axios({
				method: 'post',
				url: 'http://localhost:8080/api/v1/usuario',
				data: createUser(nombre, password),
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
			})

			if (respuesta.status === 200) {
				const roles = respuesta?.data?.roles
				setAuth({ nombre, password, roles })
				navigate(from, { replace: true })
			}
		} catch (error) {
			if (error?.response?.status === 404) {
				setErrorMsg('Credenciales incorrectas.')
			}
		}
	}

	useEffect(() => {
		if (errorMsg !== null) {
			setTimeout(() => {
				setErrorMsg(null)
			}, 5000)
		}
	}, [errorMsg])

	// useEffect(() => {
	// 	user && sessionStorage.setItem('user', JSON.stringify(user))
	// 	checked ? localStorage.setItem('user', JSON.stringify(user)) : localStorage.removeItem('user')
	// }, [user])

	return (
		<Box>
			<Container maxWidth="xs">
				<Box component="div" sx={{ mx: 1, my: 4, p: 3, boxShadow: '0 0 20px hsla(0, 0%, 0%, 0.2)', borderRadius: 2 }}>
					<Typography
						variant="h4"
						component="h1"
						fontWeight="400"
						style={{
							color: 'transparent',
							marginBottom: '1em',
							backgroundImage: 'linear-gradient(90deg, rgba(135,23,255,1) 0%, rgba(96,0,199,1) 100%)',
							backgroundClip: 'text',
							WebkitBackgroundClip: 'text',
						}}
					>
						Iniciar sesion
					</Typography>
					<Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
						<Form>
							<Box>
								<Grid container spacing={3}>
									<Grid item xs={12}>
										<InputField name="nombre" label="Nombre de usuario" variant="standard" size="small" />
									</Grid>
									<Grid item xs={12}>
										<InputField name="password" type="password" label="Contraseña" variant="standard" size="small" />
									</Grid>

									<Grid item xs={12}>
										<FormControlLabel
											control={<Checkbox checked={checked} onChange={handleChange} />}
											label="Mantener sesion iniciada."
										/>
									</Grid>
									<Grid item xs={12}>
										<Button type="submit" variant="contained">
											Iniciar
										</Button>
									</Grid>

									<Grid item xs={12}>
										{errorMsg && <Alert severity="error">{errorMsg}</Alert>}
									</Grid>
								</Grid>
							</Box>
						</Form>
					</Formik>
				</Box>
			</Container>
		</Box>
	)
}

export default Login
