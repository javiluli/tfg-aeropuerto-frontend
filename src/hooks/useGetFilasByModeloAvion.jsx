import { useEffect, useState } from 'react'

import axios from 'axios'

function useGetFilasByModeloAvion(id) {
	const [filas, setFilas] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const url = `http://localhost:8080/api/v1/filas/${id}`
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
