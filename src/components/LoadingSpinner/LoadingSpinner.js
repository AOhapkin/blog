import React from 'react'
import { Spin } from 'antd'

import classes from './LoadingSpinner.module.scss'

const LoadingSpinner = () => {
  return <Spin className={classes.spin} size="large"></Spin>
}

export default LoadingSpinner
