import { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import crearCheckin from '@/services/crearCheckin'

const checkin = (idVuelo, nombreModelo, numeroFila, letraAsiento, idReserva) => {
	return {
		idVuelo,
		nombreModelo,
		numeroFila,
		letraAsiento,
		idReserva,
	}
}

const Asientos = ({ reserva }) => {
	const { idReserva, vuelo, pasajeros, checkins, modeloAvion, filas } = reserva

	const [checkinsRestante, setCheckinsRestante] = useState(0)
	const [permitirCheckin, setPermitirCheckin] = useState(false)
	const [checkinsPermitidos, setCheckinsPermitidos] = useState(pasajeros.length - checkins.length)
	const [checkinRealizados, setCheckinRealizados] = useState(checkins)
	const [asientoSeleccionado, setAsientoSeleccionado] = useState(null)
	const [puedeHacerCheckin, setPuedeHacerCheckin] = useState(true)

	const guardaCheckin = () => {
		const numeroYLetraAsiento = asientoSeleccionado.split('-')
		const newCheckin = checkin(vuelo.idVuelo, modeloAvion, numeroYLetraAsiento[0], numeroYLetraAsiento[1], idReserva)
		crearCheckin(newCheckin)
		setPuedeHacerCheckin(false)
	}

	return (
		<div>
			<Box sx={{ my: 1 }}>
				{filas !== null ? (
					<Grid container direction="row" justifyContent="space-between" alignItems="flex-start">
						<Grid item>
							<Button variant="outlined" type="button" color="error" onClick={() => setSelectdButaca(null)}>
								Cancelar
							</Button>
						</Grid>
						<Grid item>
							<Button variant="contained" type="button" onClick={() => guardaCheckin()}>
								Guardar asiento
							</Button>
						</Grid>
					</Grid>
				) : null}
			</Box>

			<Box sx={{ my: 2 }}>
				<Grid container spacing={4} justifyContent="flex-end" alignItems="flex-start">
					<Grid item xs={12} md={4}>
						{pasajeros ? (
							<Box>
								<ListOfPasajeros pasajeros={pasajeros} />
								<Typography>Se permite hacer checkin {checkinsPermitidos} veces</Typography>
							</Box>
						) : (
							<Typography>No se ha encontrado la reserva indicada.</Typography>
						)}
					</Grid>

					<Grid item xs={12} md={8}>
						{filas.map(({ numeroFila, butacas }) => (
							<Fila
								key={numeroFila}
								fila={numeroFila}
								butacas={butacas}
								onSelected={setAsientoSeleccionado}
								selected={asientoSeleccionado}
							/>
						))}
					</Grid>
				</Grid>
			</Box>
		</div>
	)
}

export default Asientos

const ListOfPasajeros = ({ pasajeros }) => {
	return (
		<Box>
			<Typography>Lista de pasajeros asociados a la reserva</Typography>
			{pasajeros.map(({ nombre, apellidos, dni, email }) => (
				<Typography key={dni}>
					- Pasajero: {nombre} {apellidos}, con DNI: {dni} | E-mail: {email}
				</Typography>
			))}
		</Box>
	)
}

const Fila = ({ fila, butacas, selected, onSelected, allCkeckins, children }) => {
	return (
		<Box>
			<Grid container direction="row" alignItems="center">
				{butacas.map((butaca) => (
					<Butaca
						id={`${fila}-${butaca}`}
						asientoSeleccionado={selected}
						onClick={() => onSelected(`${fila}-${butaca}`)}
					>
						<Typography variant="body2" component="span">
							{`${fila}-${butaca}`}
						</Typography>
					</Butaca>
				))}
			</Grid>
		</Box>
	)
}

const Butaca = ({ id, asientoSeleccionado, children, ...props }) => {
	const bgColor = asientoSeleccionado === id ? 'hsl(60, 100%, 75%)' : 'hsl(90, 100%, 75%)'
	return (
		<Grid item sx={{ p: 1 }}>
			<Box
				component="button"
				sx={{
					width: 40,
					height: 40,
					backgroundColor: bgColor,
					borderRadius: '20px 20px 5px 5px',
				}}
				{...props}
			>
				{children}
			</Box>
		</Grid>
	)
}
