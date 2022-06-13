import axios from 'axios'

const getAllProgramas = async () => {
	const URL = 'http://localhost:8080/api/v1/programas/all'
	try {
		const respuesta = await axios.get(URL, {
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
		})

		if (respuesta.status === 200) {
			const data = JSON.parse(respuesta.request?.response)
			// const programas = data.map((programa) => {
			// 	const { idAeropuerto, nombre, ciudad, pais } = programa
			// 	return { idAeropuerto, nombre, ciudad, pais }
			// })

			return data
		}
	} catch (error) {
		console.log(error)
	}
}

export default getAllProgramas
