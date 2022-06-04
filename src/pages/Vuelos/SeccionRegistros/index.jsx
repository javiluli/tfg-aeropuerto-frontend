import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import InputField from '../InputField'
import Typography from '@mui/material/Typography'

const SeccionRegistros = () => {
	return (
		<>
			<Container maxWidth="lg" sx={{ p: 2 }}>
				<Grid container spacing={4}>
					<Grid
						item
						xs={12}
						container
						justifyContent="space-between"
						alignItems="center"
						style={{ position: 'relative' }}
					>
						<Grid item container direction="row" justifyContent="flex-start" alignItems="center">
							<Typography
								variant="h4"
								component="h2"
								fontWeight="400"
								ml={2}
								style={{
									color: 'transparent',
									marginRight: '0.25em',
									backgroundImage: 'linear-gradient(90deg, rgba(135,23,255,1) 0%, rgba(96,0,199,1) 100%)',
									backgroundClip: 'text',
									WebkitBackgroundClip: 'text',
								}}
							>
								Informacion de los pasajeros
							</Typography>
						</Grid>
					</Grid>

					<Grid item container xs={12} spacing={3}>
						<Grid item xs={12} md={6} xl={3}>
							<InputField name="nombre" label="Nombre" variant="standard" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<InputField name="apellidos" label="Apellidos" variant="standard" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<InputField name="dni" label="DNI" variant="standard" />
						</Grid>
						<Grid item xs={12} md={6} xl={3}>
							<InputField name="email" label="E-mail" variant="standard" />
						</Grid>
					</Grid>
				</Grid>
			</Container>
		</>
	)
}

export default SeccionRegistros
