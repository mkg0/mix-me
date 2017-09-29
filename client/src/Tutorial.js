import React from 'react'
import { withState, withHandlers, compose } from 'recompose'

import {
  AppBar,
  Step,
  Stepper,
  StepButton,
  StepContent,
  RaisedButton,
  FlatButton,
  Subheader,
} from 'material-ui'

function Tutorial({ step, onNext, onPrevious, onSelectStep }) {
  return (
    <div>
      <AppBar showMenuIconButton={false} title="Tutorial" />

      <Subheader>
        Mix and Match - a way to get to know your colleagues
      </Subheader>
      <Stepper activeStep={step} linear={false} orientation="vertical">
        <Step>
          <StepButton onClick={() => onSelectStep(0)}>Sign Up</StepButton>
          <StepContent>
            <p>
              better you're willing to spend on clicks and conversions, which
              networks and geographical locations you want your ads to show on,
              and more.
            </p>
            <RaisedButton primary label="Next" onClick={onNext} />
          </StepContent>
        </Step>

        <Step>
          <StepButton onClick={() => onSelectStep(1)}>
            Get a notification with your buddies group
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

        <Step>
          <StepButton onClick={() => onSelectStep(2)}>
            Meet and have fun!
          </StepButton>
          <StepContent>
            <p>
              For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.
            </p>
          </StepContent>
        </Step>
      </Stepper>
    </div>
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
