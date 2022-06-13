import { useEffect, useState } from 'react'

import getAllProgramas from '@/services/getAllProgramas'

function useProgramas() {
	const [programas, setProgramas] = useState(null)

	useEffect(function () {
		getAllProgramas().then((programa) => {
			setProgramas(programa)
		})
	}, [])

	return { programas }
}

export default useProgramas
