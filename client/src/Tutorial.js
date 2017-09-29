import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
  RaisedButton,
  FlatButton,
} from 'material-ui'

function Tutorial({ step, onNext, onPrevious, onSelectStep }) {
  return (
    <Stepper activeStep={step} linear={false} orientation="vertical">
      <Step>
        <StepButton onClick={() => onSelectStep(0)}>
          Select campaign settings
        </StepButton>
        <StepContent>
          <p>
            For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.
          </p>

          <RaisedButton primary label="Next" onClick={onNext} />
        </StepContent>
      </Step>

      <Step>
        <StepButton onClick={() => onSelectStep(1)}>
          Select campaign settings
        </StepButton>
        <StepContent>
          <p>
            For each ad campaign that you create, you can control how much
            you're willing to spend on clicks and conversions, which networks
            and geographical locations you want your ads to show on, and more.
          </p>

          <RaisedButton primary label="Next" onClick={onNext} />
          <FlatButton label="Previous" onClick={onPrevious} />
        </StepContent>
      </Step>
    </Stepper>
  )
}

export default compose(
  withState('step', 'setStep', 0),
  withHandlers({
    onNext: ({ step, setStep }) => () => setStep(step + 1),
    onPrevious: ({ step, setStep }) => () => setStep(step - 1),
    onSelectStep: ({ setStep }) => index => setStep(index),
  })
)(Tutorial)
