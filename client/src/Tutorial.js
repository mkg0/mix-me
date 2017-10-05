import React from 'react'
import { withState, withHandlers, compose } from 'recompose'
import { withRouter } from 'react-router'

import {
  AppBar,
  Step,
  Stepper,
  StepButton,
  StepContent,
  RaisedButton,
  FlatButton,
  Subheader,
  List,
  ListItem,
  Avatar,
} from 'material-ui'

import { Assignment, MailOutline, TagFaces } from 'material-ui-icons'
import { indigo600, pink500 } from 'material-ui/styles/colors'

function Tutorial({ step, onNext, onPrevious, onSelectStep, history }) {
  return (
    <div>
      <AppBar showMenuIconButton={false} title="Tutorial" />

      <Subheader>
        Mix and Match - a way to get to know your colleagues
      </Subheader>
      <Stepper activeStep={step} linear={false} orientation="vertical">
        <Step>
          <StepButton onClick={() => onSelectStep(0)}>Register</StepButton>
          <StepContent>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<Assignment />} backgroundColor={indigo600} />
                }
                primaryText="Sign Up with your Signavio E-mail address"
              />
            </List>
            <RaisedButton primary label="Next" onClick={onNext} />
          </StepContent>
        </Step>

        <Step>
          <StepButton onClick={() => onSelectStep(1)}>
            Get a notification with your buddies group
          </StepButton>
          <StepContent>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<MailOutline />} backgroundColor={indigo600} />
                }
                primaryText="Get E-mail notification"
              />
            </List>
            <p>
              Mix and Match will form a random group of colleagues and send you
              E-mail invitation
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
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<TagFaces />} backgroundColor={pink500} />
                }
                primaryText="Meet at selected place after Pre-lunch and enjoy!"
              />
            </List>
          </StepContent>
        </Step>
      </Stepper>
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        <RaisedButton label="Go back" onClick={() => history.goBack()} />
      </div>
    </div>
  )
}

export default compose(
  withState('step', 'setStep', 0),
  withHandlers({
    onNext: ({ step, setStep }) => () => setStep(step + 1),
    onPrevious: ({ step, setStep }) => () => setStep(step - 1),
    onSelectStep: ({ setStep }) => index => setStep(index),
  }),
  withRouter
)(Tutorial)
