import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText('#8717ff'),
	backgroundColor: '#8717ff',
	borderRadius: '0.25em',
	boxShadow: 'none',
	'&:hover': {
		backgroundColor: '#6000c7',
		boxShadow: '0 0 20px rgba(135, 23, 255, 0.3)',
	},
}))

export const CustomButton = ({ text }) => {
	return (
		<Stack spacing={2} direction="row">
			<ColorButton type="submit" variant="contained">
				{text}
			</ColorButton>
		</Stack>
	)
}

export default CustomButton
