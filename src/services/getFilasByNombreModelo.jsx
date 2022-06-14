function getFilasByNombreModelo(modeloAvion) {
	const URL = `https://proyecto-beyond.herokuapp.com/api/v1/filas/${modeloAvion}`

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
				// const { numeroFila, cantidadAsientos } = data
				// return { numeroFila, cantidadAsientos }
				console.log(data)
				return data
			}
			return null
		})
}

export default getFilasByNombreModelo
