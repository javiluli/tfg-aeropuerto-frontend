import { useState } from 'react'
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'

// @/const
import { villetes } from '@/const/index'

const CSSInput = styled(InputBase)(({ theme }) => ({
	'label + &': {
		marginTop: theme.spacing(3),
	},
	'& .MuiInputBase-input': {
		position: 'relative',
		backgroundColor: theme.palette.background.paper,
		fontSize: 16,
		padding: '10px 0',
		transition: theme.transitions.create(['border-color', 'box-shadow']),
		'&::before': {
			borderBottom: '1px solid rgba(0, 0, 0, 0.42)',
			left: '0',
			bottom: '0',
			content: '""',
			position: 'absolute',
			right: '0px',
			transition: 'border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
		},
		'&:hover::before': {
			borderBottom: '2px solid #8717ff',
		},
		'&:focus::before': {
			borderBottom: '2px solid #8717ff',
		},
	},
}))

function CustomSelect({ name, villete }) {
	const [selected, setSelected] = useState(villetes.IDA_Y_VUELTA)

	const handleChange = (event) => {
		setSelected(event.target.value)
		villete(event.target.value)
	}

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<Select id={name} value={selected} onChange={handleChange} input={<CSSInput />} name={name}>
					<MenuItem value={villetes.IDA_Y_VUELTA}>Ida y vuelta</MenuItem>
					<MenuItem value={villetes.SOLO_IDA}>Solo ida</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default CustomSelect
