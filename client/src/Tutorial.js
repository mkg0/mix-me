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
      <Stepper activeStep={step} linear={false} orientation="vertical">
        <Step>
          <StepButton onClick={() => onSelectStep(0)}>Register</StepButton>
          <StepContent>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<Assignment />} backgroundColor={indigo600} />
                }
                primaryText="If you want to mix and match today, register with your Signavio e-mail address. We'll find you buddies to have lunch with."
              />
            </List>
          </StepContent>
        </Step>

        <Step>
          <StepButton onClick={() => onSelectStep(1)}>Match!</StepButton>
          <StepContent>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<MailOutline />} backgroundColor={indigo600} />
                }
                primaryText="An hour before pre-lunch we'll notify you and tell you who you matched with."
              />
            </List>
          </StepContent>
        </Step>

        <Step>
          <StepButton onClick={() => onSelectStep(2)}>Meet</StepButton>
          <StepContent>
            <List>
              <ListItem
                leftAvatar={
                  <Avatar icon={<TagFaces />} backgroundColor={pink500} />
                }
                primaryText="Meet your buddies after pre-lunch at the provided location and enjoy your lunch."
              />
            </List>
          </StepContent>
        </Step>
      </Stepper>
      <div style={{ marginTop: 20, marginLeft: 20 }}>
        <RaisedButton label="Back" onClick={() => history.goBack()} />
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
