import { GET_PASAJEROS_BY__ID_RESERVA } from '@/const'

function getPasajeroConReserva(idReserva) {
	const url = GET_PASAJEROS_BY__ID_RESERVA(idReserva)

	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(url, fetchData)
		.then((res) => res.text())
		.then((res) => {
			if (res || !/^\s*$/.test(res)) {
				let data = JSON.parse(res)
				// const { reserva, nombre, apellidos, dni, email } = data
				// return { reserva, nombre, apellidos, dni, email }
				return data
			}
			return null
		})
}

export default getPasajeroConReserva
