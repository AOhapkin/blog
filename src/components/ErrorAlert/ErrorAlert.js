import React from 'react'
import { Alert } from 'antd'

import classes from './AlertError.module.scss'

const ErrorAlert = ({ messageText }) => {
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
