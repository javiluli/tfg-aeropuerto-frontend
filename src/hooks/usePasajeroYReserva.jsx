import { useEffect, useState } from 'react'

import getPasajeroConReserva from '@/services/getPasajeroConReserva'

function usePasajeroYReserva(id) {
	const [pasajero, setPasajero] = useState(null)
	const [idReserva, setIdReserva] = useState(null)

	useEffect(
		function () {
			getPasajeroConReserva(id).then((pasajero) => {
				setPasajero(pasajero)
			})

			setIdReserva(id)
		},
		[idReserva]
	)

	return { pasajero }
}

export default usePasajeroYReserva
