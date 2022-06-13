import { useEffect, useState } from 'react'

import axios from 'axios'

function useGetPasajerosByReserva(id) {
	const [pasajeros, setPasajeros] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const url = `http://localhost:8080/api/v1/pasajeros/${id}`
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
				setPasajeros(JSON.parse(response.request?.response))
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [id])

	return { pasajeros, loading, error }
}

export default useGetPasajerosByReserva
