import { Routes, Route } from 'react-router-dom'

// Pages
import Home from '@/pages/Home'
import Vuelos from '@/pages/Vuelos'

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/vuelos" element={<Vuelos />} />
			</Routes>
		</div>
	)
}

export default App
