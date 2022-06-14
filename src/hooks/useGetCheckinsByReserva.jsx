import { useEffect, useState } from 'react'

import { GET_CHECKINS_BY__ID_RESERVA } from '@/const'
import axios from 'axios'

function useGetCheckinsByReserva(id) {
	const [checkins, setCheckins] = useState([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)

	const url = GET_CHECKINS_BY__ID_RESERVA(id)
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
