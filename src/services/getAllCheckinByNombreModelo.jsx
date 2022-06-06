function getAllCheckinByNombreModelo(nombreModelo, idVuelo) {
	const URL = `http://localhost:8080/api/v1/checkins/${nombreModelo}/${idVuelo}`

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
			let data = JSON.parse(res)
			const checkins = data.map(({ asiento }) => {
				const { fila, letraAsiento } = asiento
				const { numeroFila } = fila
				return { letraAsiento, numeroFila }
			})

			return checkins
		})
		.catch((err) => {
			return false
		})
}

export default getAllCheckinByNombreModelo
