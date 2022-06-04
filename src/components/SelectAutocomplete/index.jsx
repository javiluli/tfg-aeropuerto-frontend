import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export default function Grouped({ id, data, formik }) {
	const options = data.map((option) => {
		const firstLetter = option.ciudad[0].toUpperCase()
		return {
			firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
			...option,
		}
	})

	return (
		<Autocomplete
			fullWidth
			id={id}
			size="small"
			options={options.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
			groupBy={(option) => option.firstLetter}
			getOptionLabel={(option) => `${option.ciudad} (${option.idAeropuerto})`}
			onChange={(e, value) => formik.setFieldValue(id, value.idAeropuerto)}
			renderInput={(params) => (
				<TextField
					{...params}
					fullWidth
					name={id}
					label={id.toUpperCase()}
					variant="standard"
					value={formik.values.origen}
					onChange={formik.handleChange}
					error={formik.touched.origen && Boolean(formik.errors.origen)}
					helperText={formik.touched.origen && formik.errors.origen}
				/>
			)}
		/>
	)
}
