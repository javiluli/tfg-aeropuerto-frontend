import { GET_VUELOS_BY__ORIGEN_AND_DESTINO_AND_FECHASALIDA_AND_HORASALIDA } from '@/const'

function getBusquedaVuelos(origen, destino, fechaSalida) {
	const now = new Date()
	let horaSalida = ''

	formatDate(now) === fechaSalida
		? (horaSalida = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
		: (horaSalida = `00:00:00`)

	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	const params = {
		origen: origen,
		destino: destino,
		fechaSalida: fechaSalida,
		horaSalida: horaSalida,
	}

	const url = GET_VUELOS_BY__ORIGEN_AND_DESTINO_AND_FECHASALIDA_AND_HORASALIDA(params)

	return fetch(url, fetchData)
		.then((response) => response.text())
		.then((response) => {
			let data = JSON.parse(response)
			const vuelos = data.map((vueloObj) => {
				const { vuelo, cantidadEscalas, plazasLibres } = vueloObj
				return { vuelo, cantidadEscalas, plazasLibres }
			})

			return vuelos
		})
}

export default getBusquedaVuelos

function formatDate(date) {
	return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('-')
}
