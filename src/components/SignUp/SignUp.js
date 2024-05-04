import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { Checkbox } from 'antd'
import { useForm } from 'react-hook-form'

import { registerNewUser } from '../../redux/actions/actionCreators'
import classes from './SignUp.module.scss'

const SignUp = () => {
  const userReducers = useSelector ((state) => state.userReducers)
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    mode: 'onSubmit',
  })

  const { loading, error, user, server } = userReducers
}