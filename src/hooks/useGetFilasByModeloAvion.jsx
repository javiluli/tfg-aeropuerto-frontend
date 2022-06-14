import { useEffect, useState } from 'react'

import { GET_FILAS_BY__MODELO_AVION } from '@/const'
import axios from 'axios'

function useGetFilasByModeloAvion(id) {
	const [filas, setFilas] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const url = GET_FILAS_BY__MODELO_AVION(id)
	const config = {
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	useEffect(() => {
		setLoading(true)
		axios
			.get(url, config)
			.then((response) => {
				setFilas(JSON.parse(response.request?.response))
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [id])

	return { filas, loading, error }
}

export default useGetFilasByModeloAvion
