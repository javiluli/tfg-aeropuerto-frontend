import { useEffect, useState } from 'react'

import axios from 'axios'

function useFetch(url) {
	const [data, setData] = useState(null)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)

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
				setData(JSON.parse(response.request?.response))
			})
			.catch((err) => {
				setError(err)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [url])

	return { data, loading, error }
}

export default useFetch
