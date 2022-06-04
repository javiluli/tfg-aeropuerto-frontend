import { useContext } from 'react'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import IconButton from '@mui/material/IconButton'
import { ColorModeContext } from '@/context/toggleTheme'

const CustomizedSwitches = () => {
	const { mode, toggleMode } = useContext(ColorModeContext)

	return (
		<>
			Cambiar tema
			<IconButton onClick={toggleMode} color="inherit">
				{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</>
	)
}

export default CustomizedSwitches
