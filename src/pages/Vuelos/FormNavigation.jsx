import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

const FormNavigation = (props) => {
	return (
		<Stack direction="row" justifyContent={props.hasPrevious ? 'space-between' : 'flex-end'} sx={{ px: 3 }}>
			{props.hasPrevious && (
				<Button variant="outlined" type="button" onClick={props.onBackClick}>
					Atras
				</Button>
			)}

			<Button variant="contained" type="submit" size="large">
				{props.isLastStep ? 'Finalizar' : 'Continuar'}
			</Button>
		</Stack>
	)
}

export default FormNavigation
