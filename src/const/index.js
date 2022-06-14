// Tipos de villetes
export const villetes = {
	IDA_Y_VUELTA: '1',
	SOLO_IDA: '2',
}

export const mensajes = {
	// Mensajes de error del formulario para buscar vuelos en la Pagina <Home />
	ELIGE_CIUDAD_ORIGEN: 'Elige una ciudad de origen.',
	ELIGE_CIUDAD_DESTINO: 'Elige una ciudad de destino.',
	SELECCIONAR_FECHA_IDA: 'Debe seleccionar la fecha de ida',
	SELECCIONAR_FECHA_VUELTA: 'Debe seleccionar la fecha de vuelta',
	SELECCIONAR_FECHA_IDA_Y_VUELTA: 'Debes seleccionar fecha de ida y fecha de vuelta',
	MINIMO_PASAJEROS: 'El minimo de pasajeros es de 1',
	MAXIMO_PASAJEROS: 'El minimo de pasajeros es de 5',
}

const URL_BASE = 'http://localhost:8080/api/v1'
export const urls = {
	GET_AEROPUERTOS: `https://proyecto-beyond.herokuapp.com/api/v1/aeropuertos`,
	GET_PASAJERO_Y_RESERVA: `https://proyecto-beyond.herokuapp.com/api/v1/pasajero`,

	GET_CHECKINST_BY_ID: `https://proyecto-beyond.herokuapp.com/api/v1/checkins`,
}

export const GET_ALL_AEROPUERTOS = () => 'https://proyecto-beyond.herokuapp.com/api/v1/aeropuertos'

export const GET_ALL_PROGRAMAS = () => 'https://proyecto-beyond.herokuapp.com/api/v1/programas/all'

export const GET_VUELOS_BY__ORIGEN_AND_DESTINO_AND_FECHASALIDA_AND_HORASALIDA = (params) => {
	const url = new URL('https://proyecto-beyond.herokuapp.com/api/v1/vuelosBySalidaAndLlegada')

	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.set(key, value)
	})

	return url.toString()
}

export const GET_CHECKINS_BY__ID_RESERVA = (id) => `https://proyecto-beyond.herokuapp.com/api/v1/checkins/${id}`

export const GET_ALL_CHECKINS_BY__ID_VUELO__AND__NOMBRE_MODELO = (nombreModelo, idVuelo) =>
	`https://proyecto-beyond.herokuapp.com/api/v1/checkins/${nombreModelo}/${idVuelo}`

export const GET_FILAS_BY__MODELO_AVION = (id) => `https://proyecto-beyond.herokuapp.com/api/v1/filas/${id}`

export const GET_PASAJEROS_BY__ID_RESERVA = (id) => `https://proyecto-beyond.herokuapp.com/api/v1/pasajeros/${id}`

export const GET_RESERVA_BY__ID_RESERVA = (id) => `https://proyecto-beyond.herokuapp.com/api/v1/reserva/${id}`

export const POST_CHECKIN = () => `https://proyecto-beyond.herokuapp.com/api/v1/checkin`

export const POST_RESERVA = () => `https://proyecto-beyond.herokuapp.com/api/v1/reservas/`

export const DELETE_RESERVA_BY__ID_RESERVA = (id) => `https://proyecto-beyond.herokuapp.com/api/v1/reserva/${id}`

export const GET_AUTH_USER = () => 'https://proyecto-beyond.herokuapp.com/api/v1/usuario/'
