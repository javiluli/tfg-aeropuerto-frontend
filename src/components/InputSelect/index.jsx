import { Select } from '@mui/material'

const InputSelect = ({ children, form, field }) => {
	const { name, value } = field
	const { setFieldValue } = form

	return (
		<Select
			name={name}
			value={value}
			onChange={(e) => {
				setFieldValue(name, e.target.value)
			}}
		>
			{children}
		</Select>
	)
}

export default InputSelect
