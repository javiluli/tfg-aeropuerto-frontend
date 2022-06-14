import { POST_CHECKIN } from '@/const'

function crearCheckin(checkin) {
	const url = POST_CHECKIN()

	const fetchData = {
		method: 'POST',
		body: JSON.stringify(checkin),
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Content-Type': 'application/json',
		},
	}

	return fetch(url, fetchData)
		.then((res) => res.text())
		.then((res) => {
			return true
		})
		.catch((err) => {
			return false
		})
}

export default crearCheckin
