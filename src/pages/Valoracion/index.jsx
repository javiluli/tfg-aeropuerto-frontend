import { Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Header from '@/components/Header'
import Rating from '@mui/material/Rating'
import Stack from '@mui/material/Stack'
import StarIcon from '@mui/icons-material/Star'
import axios from 'axios'
import useFetch from '@/hooks/useFetch'

const rngUserName = () => Math.random().toString(36).substring(2, 10)

function votacion(user, valoracion) {
	return {
		user,
		valoracion,
	}
}

const labels = {
	0.5: 1,
	1: 2,
	1.5: 3,
	2: 4,
	2.5: 5,
	3: 6,
	3.5: 7,
	4: 8,
	4.5: 9,
	5: 10,
}

function getLabelText(value) {
	return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

const initAnonimo = () => {
	let user = votacion(rngUserName(), 0)
	localStorage.setItem('usuarioAnonimo', JSON.stringify(user))
	console.log('------')
	return user
}

const index = () => {
	const [value, setValue] = useState(0)
	const [hover, setHover] = useState(-1)

	const [usuarioAnonimo, setUsuarioAnonimo] = useState(JSON.parse(localStorage.getItem('usuarioAnonimo')) || null)
	const [nameUser, setNameUser] = useState(null)
	const [valoracionUser, setValoracionUser] = useState(null)

	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

	const { data: allValoraciones } = useFetch('https://proyecto-beyond.herokuapp.com/api/v1/valoraciones/all')

	// en caso de que no exista en el localStorage un usuario anonimo
	if (usuarioAnonimo === null) {
		const anonimo = initAnonimo()
		setUsuarioAnonimo(anonimo)
	}

	useEffect(() => {
		const { user } = JSON.parse(localStorage.getItem('usuarioAnonimo'))
		setNameUser(user)
		setValoracionUser(value)

		saveValoracion(value)

		// const data = JSON.parse(localStorage.getItem('usuarioAnonimo'))

		// let nota = votacion(data.user, value)

		// setNameUser(data.user)

		// setValoracionUser(data.valoracion)

		// localStorage.setItem('usuarioAnonimo', JSON.stringify(nota))

		// setUsuarioAnonimo(localStorage.getItem('usuarioAnonimo'))
	}, [value])

	const saveValoracion = (newValue) => {
		axios
			.post('https://proyecto-beyond.herokuapp.com/api/v1/valoraciones/save', {
				user: nameUser,
				valoracion: value,
			})
			.then((response) => {
				console.log(response.data)
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	const getAllValoraciones = () => {
		axios
			.get('https://proyecto-beyond.herokuapp.com/api/v1/valoraciones/all')
			.then((response) => {
				console.log(response)
				return response.data
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}

	return (
		<Box>
			<Header />

			<Box sx={{ px: 5, py: 10 }}>
				<Container maxWidth="xl">
					<Box component="div" sx={{ px: 5, py: 3, backgroundColor: 'background.default', borderRadius: 4 }}>
						<Typography>{nameUser}</Typography>
						<Box
							sx={{
								width: 200,
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Rating
								name="hover-feedback"
								value={value}
								size="large"
								precision={0.5}
								getLabelText={getLabelText}
								onChange={(event, newValue) => {
									setValue(newValue)
								}}
								onChangeActive={(event, newHover) => {
									setHover(newHover)
								}}
								emptyIcon={<StarIcon style={{ opacity: 0.5 }} fontSize="inherit" />}
							/>
							{value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
						</Box>
						<Box
							sx={{
								my: 3,
							}}
						>
							{allValoraciones !== null
								? allValoraciones.map(({ user, valoracion }) => (
										<Box
											sx={{
												maxWidth: 240,
												m: 1,
												p: 1.5,
												boxShadow: '0 0 10px hsla(0, 0%, 0%, 0.1)',
												borderRadius: 4,
											}}
										>
											<Grid container direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
												<Grid item>
													<Typography>{user}</Typography>
												</Grid>
												<Grid item>
													<Rating name="read-only" value={valoracion} precision={0.5} readOnly />
												</Grid>
											</Grid>
										</Box>
								  ))
								: null}
						</Box>
					</Box>
				</Container>
			</Box>
		</Box>
	)
}

export default index
