import { Box, Step, StepLabel, Stepper } from '@mui/material'
import { Children, useState } from 'react'
import { Form, Formik } from 'formik'

import { Container } from '@mui/system'
import FormNavigation from './FormNavigation'

const MultiStepForm = ({ children, initialValues, onSubmit }) => {
	const [stepNumber, setStepNumber] = useState(0)
	const steps = Children.toArray(children)

	const [snapshot, setSnapshot] = useState(initialValues)

	const step = steps[stepNumber]
	const totalSteps = steps.length
	const isLastStep = stepNumber === totalSteps - 1

	const next = (values) => {
		setSnapshot(values)
		setStepNumber(stepNumber + 1)
	}

	const back = (values) => {
		setSnapshot(values)
		setStepNumber(stepNumber - 1)
	}

	const handleSubmit = async (values, actions) => {
		if (step.props.onSubmit) {
			await step.props.onSubmit(values)
		}

		if (isLastStep) {
			return onSubmit(values, actions)
		} else {
			actions.setTouched({})
			next(values)
		}
	}

	return (
		<Box>
			<Formik initialValues={snapshot} onSubmit={handleSubmit} validationSchema={step.props.validationSchema}>
				{(formik) => (
					<Form style={{ position: 'relative', marginBottom: '10em' }}>
						<Stepper activeStep={stepNumber} alternativeLabel>
							{steps.map((currentStep) => {
								const label = currentStep.props.stepName
								return (
									<Step key={label}>
										<StepLabel>{label}</StepLabel>
									</Step>
								)
							})}
						</Stepper>
						{step}

						<Box
							sx={{
								py: 6,
								position: 'fixed',
								bottom: 0,
								left: 0,
								right: 0,
								width: '100%',
								margin: '0 auto',
								backgroundColor: 'hsl(0, 0%, 100%, 0.8)',
								borderTop: '1px solid hsl(0, 0%, 0%, 0.1)',
								zIndex: 1,
							}}
						>
							<Container>
								<FormNavigation
									isLastStep={isLastStep}
									hasPrevious={stepNumber > 0}
									onBackClick={() => back(formik.values)}
								/>
							</Container>
						</Box>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default MultiStepForm

export const FormStep = ({ stepName = '', children }) => children
