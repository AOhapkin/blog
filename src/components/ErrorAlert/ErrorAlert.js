import React from 'react'
import { Alert } from 'antd'

import classes from './ErrorAlert.module.scss'

const ErrorAlert = ({ messageText }) => {
  console.log(messageText)
  if (!messageText)
    messageText = 'We have a problem. Try again later'

  return (
    <Alert
      className={classes.alert}
      message="Error"
      type="error"
      description={messageText}
      showIcon
    />
  )
}

export default ErrorAlert
