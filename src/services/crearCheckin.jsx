function crearCheckin(checkin) {
	const URL = `http://localhost:8080/api/v1/checkin`

	console.log(checkin)

	const fetchData = {
		method: 'POST',
		body: JSON.stringify(checkin),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(URL, fetchData)
		.then((res) => res.text())
		.then((res) => {
			return true
		})
		.catch((err) => {
			return false
		})
}

export default crearCheckin
