import { useEffect, useState } from 'react'

import axios from 'axios'

function useGetCheckinsByReserva(id) {
	const [checkins, setCheckins] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const url = `http://localhost:8080/api/v1/checkins/${id}`
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
				setCheckins(JSON.parse(response.request?.response))
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [id])

	return { checkins, loading, error }
}

export default useGetCheckinsByReserva
