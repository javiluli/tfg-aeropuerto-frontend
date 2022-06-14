import { GET_ALL_CHECKINS_BY__ID_VUELO__AND__NOMBRE_MODELO } from '@/const'

function getAllCheckinByNombreModelo(nombreModelo, idVuelo) {
	let url = GET_ALL_CHECKINS_BY__ID_VUELO__AND__NOMBRE_MODELO(nombreModelo, idVuelo)

	const fetchData = {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(url, fetchData)
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
