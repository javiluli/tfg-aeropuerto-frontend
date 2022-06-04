import { useEffect, useState } from 'react'

import getBusquedaVuelos from '@/services/busquedaVuelos'

function useVuelos(origen, destino, fechaIda) {
	const [vuelos, setVuelos] = useState(null)

	useEffect(function () {
		getBusquedaVuelos(origen, destino, fechaIda).then((vuelo) => {
			setVuelos(vuelo)
		})
	}, [])

	return vuelos
}

export default useVuelos
