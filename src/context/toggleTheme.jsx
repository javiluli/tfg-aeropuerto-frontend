import { ThemeProvider, createTheme } from '@mui/material'
import { createContext, useMemo, useState } from 'react'

export const ColorModeContext = createContext({
	toggle: () => {},
	mode: 'light',
})

const themeObj = {
	light: {
		primary: {
			main: 'hsl(270, 95%, 60%)',
		},
		background: {
			default: 'hsl(0, 0%, 100%)',
			paper: 'hsl(0, 0%, 98%)',
		},
	},

	dark: {
		primary: {
			main: '#8717ff',
		},
		background: {
			default: 'hsl(0, 0%, 12%)',
			paper: 'hsl(0, 0%, 7%)',
		},
	},
}

export const ColorContextProvider = ({ children }) => {
	const [mode, setMode] = useState('light')

	const colorMode = useMemo(
		() => ({
			toggleMode: () => setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light')),
			mode,
		}),
		[mode]
	)

	const theme = createTheme({
		palette: {
			mode: mode,
			...themeObj[mode],
		},
	})

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}> {children} </ThemeProvider>
		</ColorModeContext.Provider>
	)
}
