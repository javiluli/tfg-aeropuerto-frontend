function crearReserva(newReserva) {
	const URL = `http://localhost:8080/api/v1/reservas`

	const fetchData = {
		method: 'POST',
		body: JSON.stringify(newReserva),
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

export default crearReserva
