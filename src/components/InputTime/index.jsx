import { Box, Stack } from '@mui/material'

import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { LocalizationProvider } from '@mui/lab'
import TextField from '@mui/material/TextField'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { useState } from 'react'

const InputTime = ({ label, onChangeTime, ...props }) => {
	const [time, setTime] = useState(null)

	const handleChange = (value) => {
		setTime(value)
		onChangeTime(value)
	}

	return (
		<Box sx={{ minWidth: 120 }}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<TimePicker
					{...props}
					label={label}
					value={time}
					onChange={handleChange}
					renderInput={(params) => <TextField {...params} />}
				/>
			</LocalizationProvider>
		</Box>
	)
}

export default InputTime
