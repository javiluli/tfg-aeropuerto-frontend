import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import eliminarReserva from '@/services/eliminarReserva'

const InfoReserva = ({ reserva }) => {
	const { idReserva, vuelo, pasajeros, checkins, modeloAvion, filas } = reserva

	return (
		<div>
			<Box sx={{ my: 2 }}>
				<Grid container spacing={4} justifyContent="flex-end" alignItems="flex-start">
					<Grid item xs={12}>
						{reserva !== null ? (
							<Grid spacing={4} container direction="row" justifyContent="flex-end" alignItems="flex-start">
								<Grid item xs={12}>
									<CardOfReserva reserva={reserva} />
								</Grid>
								<Grid item>
									<Button variant="outlined" type="button" color="error" onClick={() => eliminarReserva(idReserva)}>
										Cancelar reserva
									</Button>
								</Grid>
							</Grid>
						) : null}
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

export default InfoReserva

const CardOfReserva = ({ reserva }) => {
	const { vuelo, pasajeros, modeloAvion } = reserva
	return (
		<Box>
			<Typography variant="h5" component="h2">
				Datos sobre el avion
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
								{modeloAvion}
							</TableCell>
							<TableCell>{vuelo.matriculaAvion}</TableCell>
							<TableCell>
								{vuelo.fechaSalida} {vuelo.horaSalida}
							</TableCell>
							<TableCell>
								{vuelo.fechaLlegada} {vuelo.horaLlegada}
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
						{pasajeros.map(({ nombre, apellidos, dni, email }) => (
							<TableRow key={1} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
								<TableCell component="th" scope="row">
									{nombre}
								</TableCell>
								<TableCell>{apellidos}</TableCell>
								<TableCell>{dni}</TableCell>
								<TableCell>{email}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Box>
	)
}
