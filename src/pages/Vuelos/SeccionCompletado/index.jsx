import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SeccionCompletado = () => {
	return (
		<Container maxWidth="lg" sx={{ p: 2 }}>
			<Box component="div">
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
					¡Reserva completada!
				</Typography>
			</Box>
		</Container>
	)
}

export default SeccionCompletado
