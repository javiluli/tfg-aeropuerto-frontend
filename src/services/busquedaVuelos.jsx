function getBusquedaVuelos(origen, destino, fechaIda) {
	const now = new Date()
	let timeNow = ''

	formatDate(now) === fechaIda
		? (timeNow = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`)
		: (timeNow = `00:00:00`)

	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	const URL = `http://localhost:8080/api/v1/vuelosBySalidaAndLlegada?origen=${origen}&destino=${destino}&fechaSalida=${fechaIda}&horaSalida=${timeNow}`

	return fetch(URL, fetchData)
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
