import { DELETE_RESERVA_BY__ID_RESERVA } from '@/const'

function eliminarReserva(idReserva) {
	const url = DELETE_RESERVA_BY__ID_RESERVA(idReserva)

	const fetchData = {
		method: 'DELETE',
		body: JSON.stringify(idReserva),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(url, fetchData)
		.then((response) => response.text())
		.then((response) => {
			return true
		})
		.catch((err) => {
			return false
		})
}

export default eliminarReserva
