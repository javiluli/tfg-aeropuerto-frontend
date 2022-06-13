import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Box } from '@mui/material'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import TextField from '@mui/material/TextField'
import { useState } from 'react'

const InputDateTime = ({ date, minDate, onChangeDate, onChangeTime, ...props }) => {
	const [value, setValue] = useState(date)

	const handleChange = (value) => {
		setValue(value)
		const dateFormat = `${value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`
		const timeFormat = `${value.getHours()}:${value.getMinutes()}`
		onChangeDate(dateFormat)
		onChangeTime(timeFormat)
	}

	return (
		<Box sx={{ minWidth: 120 }}>
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DateTimePicker
					renderInput={(params) => <TextField {...params} />}
					{...props}
					value={value}
					onChange={(newValue) => {
						handleChange(newValue)
					}}
					minDateTime={minDate}
				/>
			</LocalizationProvider>
		</Box>
	)
}

export default InputDateTime
