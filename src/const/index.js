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
	GET_AEROPUERTOS: `${URL_BASE}/aeropuertos`,
}
