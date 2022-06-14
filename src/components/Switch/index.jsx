import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { ColorModeContext } from '@/context/toggleTheme'
import IconButton from '@mui/material/IconButton'
import { Typography } from '@mui/material'
import { useContext } from 'react'

const CustomizedSwitches = () => {
	const { mode, toggleMode } = useContext(ColorModeContext)

	return (
		<Typography variant="body1" component="span">
			Cambiar tema
			<IconButton onClick={toggleMode} color="inherit">
				{mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
			</IconButton>
		</Typography>
	)
}

export default CustomizedSwitches
