import { useEffect, useState } from 'react'
import getAeropuertos from '@/services/aeropuertos'

function useAeropuertos() {
	const [aeropuertos, setAeropuertos] = useState(null)

	useEffect(function () {
		getAeropuertos().then((aeropuerto) => {
			setAeropuertos(aeropuerto)
		})
	}, [])

	return { aeropuertos }
}

export default useAeropuertos
