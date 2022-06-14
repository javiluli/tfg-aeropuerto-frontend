import { GET_ALL_AEROPUERTOS } from '@/const/index'

function getAeropuertos() {
	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(GET_ALL_AEROPUERTOS(), fetchData)
		.then((response) => response.text())
		.then((response) => {
			let data = JSON.parse(response)
			const aeropuertos = data.map((aeropuerto) => {
				const { idAeropuerto, nombre, ciudad, pais } = aeropuerto
				return { idAeropuerto, nombre, ciudad, pais }
			})

			return aeropuertos
		})
}

export default getAeropuertos
