import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import { ColorContextProvider } from './context/toggleTheme'

ReactDOM.createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<ColorContextProvider>
			<App />
		</ColorContextProvider>
	</BrowserRouter>
)
