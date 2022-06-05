function getPasajeroConReserva(idReserva) {
	const URL = `http://localhost:8080/api/v1/pasajero/${idReserva}`
	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(URL, fetchData)
		.then((res) => res.text())
		.then((res) => {
			if (res || !/^\s*$/.test(res)) {
				let data = JSON.parse(res)
				const { reserva, nombre, apellidos, dni, email } = data
				return { reserva, nombre, apellidos, dni, email }
			}
			return null
		})
}

export default getPasajeroConReserva
