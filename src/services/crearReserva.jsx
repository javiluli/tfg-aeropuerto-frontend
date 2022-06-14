import { POST_RESERVA } from '@/const'

function crearReserva(newReserva) {
	const url = POST_RESERVA()

	const fetchData = {
		method: 'POST',
		body: JSON.stringify(newReserva),
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

export default crearReserva
