import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import { loginUser } from '../../redux/actions/actionCreators'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import classes from './SignIn.module.scss'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onSubmit',
  })
  const userReducers = useSelector((state) => state.userReducers)
  const dispatch = useDispatch()
  const history = useHistory()

  const { loading, error, server, isLogin } = userReducers

  const onSubmit = (dataUser) => {
    const { email, password } = dataUser
    const user = {
      user: {
        email: email,
        password: password,
      },
    }
    dispatch(loginUser(user))
  }

  useEffect(() => {
    if (isLogin) {
      reset()
      history.push('/articles')
    }
  }, [isLogin, history])

  return (
    <>
      {error ? <ErrorAlert message={error} /> : null}
      {loading && !error ? <LoadingSpinner /> : null}
      <div className={classes.sign_in}>
        <h1 className={classes.sign_in__title}>Sign In</h1>
        <form
          className={classes.sign_in__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* email */}
          <label className={classes.sign_in__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${classes.sign_in__input} ${
              errors.email || server.errors.errors
                ? classes.sign_in__input_error
                : ''
            }`}
            placeholder="Email address"
            type="email"
            id="email"
            autoComplete="off"
            {...register('email', {
              required: 'This field is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <p className={classes.form_text_error}>{message}</p>
            )}
          />
          {server.errors.errors ? (
            <p className={classes.form_text_error}>
              email or password is invalid
            </p>
          ) : null}

          {/* password */}
          <label className={classes.sign_in__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${classes.sign_in__input} ${
              errors.password || server.errors.errors
                ? classes.sign_in__input_error
                : ''
            }`}
            placeholder="Password"
            type="password"
            id="password"
            autoComplete="off"
            {...register('password', {
              required: 'This field is required',
              minLength: {
                value: 6,
                message: 'This field must contain at least 6 characters',
              },
              maxLength: {
                value: 40,
                message: 'This field must contain no more than 40 characters',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <p className={classes.form_text_error}>{message}</p>
            )}
          />
          {server.errors.errors ? (
            <p className={classes.form_text_error}>
              email or password is invalid
            </p>
          ) : null}

          <button
            className={classes.sign_in__submit}
            type="submit"
            value="Login"
          >
            Login
          </button>
          <p className={classes.account_question}>
            Don’t have an account?
            <Link to="/sign-up" className={classes.account_question__link}>
              Sign Up
            </Link>
            .
          </p>
        </form>
      </div>
    </>
  )
}

export default SignIn
