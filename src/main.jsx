import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

import App from './App'
import { AuthProvider } from '@/context/AuthProvider'
import { ColorContextProvider } from './context/toggleTheme'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ColorContextProvider>
			<AuthProvider>
				<Routes>
					<Route path="/*" element={<App />} />
				</Routes>
			</AuthProvider>
		</ColorContextProvider>
	</BrowserRouter>
)
