function eliminarReserva(idReserva) {
	const URL = `http://localhost:8080/api/v1/reserva/${idReserva}`

	const fetchData = {
		method: 'DELETE',
		body: JSON.stringify(idReserva),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(URL, fetchData)
		.then((response) => response.text())
		.then((response) => {
			return true
		})
		.catch((err) => {
			return false
		})
}

export default eliminarReserva
