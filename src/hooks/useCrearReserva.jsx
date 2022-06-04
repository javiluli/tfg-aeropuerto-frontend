import { useEffect, useState } from 'react'
import postCrearReserva from '@/services/crearReserva'

function useCrearReserva(reserva) {
	const [respuesta, setRespuesta] = useState(null)

	useEffect(function () {
		console.log(reserva)
		postCrearReserva(reserva).then((res) => {
			setRespuesta(res)
		})
	}, [])

	return respuesta
}

export default useCrearReserva
