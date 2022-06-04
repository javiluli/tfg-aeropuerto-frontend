import { useState } from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import InputBase from '@mui/material/InputBase'

// @/const
import { villetes } from '@/const/index'

function CustomSelect({ name, villete }) {
	const [selected, setSelected] = useState(villetes.IDA_Y_VUELTA)

	const handleChange = (event) => {
		setSelected(event.target.value)
		villete(event.target.value)
	}

	return (
		<Box sx={{ minWidth: 120 }}>
			<FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
				<Select id={name} value={selected} onChange={handleChange} input={<InputBase />} name={name}>
					<MenuItem value={villetes.IDA_Y_VUELTA}>Ida y vuelta</MenuItem>
					<MenuItem value={villetes.SOLO_IDA}>Solo ida</MenuItem>
				</Select>
			</FormControl>
		</Box>
	)
}

export default CustomSelect
