'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'

import { FeedbackAlert } from '../FeedbackAlert'

type Step = { label: string; component: React.ReactNode }

interface LinearStepperProps {
  steps?: Step[]
  onClose: () => void
  activeStep: number
  errorStep: boolean
  errorStepMessage?: string
  setActiveStep: React.Dispatch<React.SetStateAction<number>>
  handleNext: () => void
  completeMessage?: string
  isLoading: boolean
}

export default function LinearStepper({
  steps,
  onClose,
  activeStep,
  handleNext,
  setActiveStep,
  errorStep,
  errorStepMessage,
  completeMessage,
  isLoading,
}: LinearStepperProps) {
  if (!steps) return null
  // Variables
  const haveFinishSteps = activeStep === steps.length

  // Functions
  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  return (
    <Box sx={{ width: '100%' }}>
      <Box>{steps[activeStep]?.component}</Box>
      {errorStep && (
        <FeedbackAlert.Root>
          <FeedbackAlert.Content mutationState={errorStep ? 'error' : 'success'}>
            {errorStepMessage}
          </FeedbackAlert.Content>
        </FeedbackAlert.Root>
      )}
      <Stepper activeStep={activeStep} sx={{ marginTop: '24px' }}>
        {steps.map(({ label }, index) => {
          const stepProps: { completed?: boolean; error?: boolean } = {
            error: errorStep && index === activeStep,
          }
          const labelProps: {
            optional?: React.ReactNode
            error?: boolean
          } = {
            error: errorStep && index === activeStep,
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          )
        })}
      </Stepper>
      {haveFinishSteps && (
        <>
          <FeedbackAlert.Root>
            <FeedbackAlert.Content mutationState='success'>{completeMessage}</FeedbackAlert.Content>
          </FeedbackAlert.Root>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={onClose}>Fechar</Button>
          </Box>
        </>
      )}

      {!haveFinishSteps && (
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button
            color='inherit'
            disabled={activeStep === 0 || isLoading}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Voltar
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          <Button disabled={isLoading} onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Confirmar' : 'Proximo'}
          </Button>
        </Box>
      )}
    </Box>
  )
}
