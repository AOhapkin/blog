import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';

import { registerNewUser } from '../../redux/actions/actionCreators'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
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
  const { token } = user

  const password = watch('password', '')
  const onSubmit = (dataUser) => {
    const { username, email, password } = dataUser
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
      },
    }
    dispatch(registerNewUser(user))
  }

  useEffect(() => {
    if (token) {
      history.push('/sign-in')
      reset()
    }
  }, [token, server, reset, history])

  return (
    <div>
      {error ? <ErrorAlert messageText={error} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className={classes.sign_up}>
        <h2 className={classes.sign_up__title}>Create new account</h2>
        <form
          className={classes.sign_up__form}
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* username */}
          <label className={classes.sign_up__label} htmlFor="username">
            Username
          </label>
          <input
            className={`${classes.sign_up__input} ${
              errors.username || server.errors.username
                ? classes.sign_up__input_error
                : ''
            }`}
            placeholder="Username"
            id="username"
            autoComplete="off"
            {...register('username', {
              required: 'This field is required',
              minLength: {
                value: 3,
                message: 'Your password needs to be at least 3 characters',
              },
              maxLength: {
                value: 20,
                message: 'This field must contain no more than 20 characters',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => {
              return <p className={classes.form_text_error}>{message}</p>
            }}
          />

          {server.errors.username ? (
            <p className={classes.sign_up__text_error}>
              {server.errors.username}
            </p>
          ) : null}

          {/* email */}
          <label className={classes.sign_up__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${classes.sign_up__input} ${
              errors.email || server.errors.email
                ? classes.sign_up__input_error
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
          {server.errors.email ? (
            <p className={classes.sign_up__text_error}>{server.errors.email}</p>
          ) : null}

          {/* password */}
          <label className={classes.sign_up__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${classes.sign_up__input} ${
              errors.password ? classes.sign_up__input_error : ''
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
          <label className={classes.sign_up__label} htmlFor="repeat password">
            Repeat Password
          </label>
          <input
            className={`${classes.sign_up__input} ${
              errors['repeat password'] ? classes.sign_up__input_error : ''
            }`}
            placeholder="Password"
            type="password"
            id="repeat password"
            autoComplete="off"
            {...register('repeat password', {
              required: 'This field is required',
              validate: (value) =>
                value === password || 'Passwords must match',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="repeat password"
            render={({ message }) => (
              <p className={classes.form_text_error}>{message}</p>
            )}
          />

          {/* checbox agree  */}

          <div className={classes.sign_up__agreement}>
            <input
              className={classes.sign_up__checkbox}
              type='checkbox'
              {...register('checkbox', {
                checked: false,
                onChange: (e) => {
                  setValue('checkbox', e.target.checked)
                },
                validate: (value) => value || 'Confirm your consent',
              })}
            />
            <span className={classes.sign_up__agreement_text}>
              I agree to the processing of my personal information
            </span>
          </div>
          <ErrorMessage
            errors={errors}
            name="checkbox"
            render={({ message }) => (
              <p className={classes.form_text_error}>{message}</p>
            )}
          />

          <button className={classes.sign_up__submit} type="submit">
            Create
          </button>
        </form>

        <p className={classes.account_question}>
          Already have an account?
          <Link to="/sign-in" className={classes.account_question__link}>
            Sign In
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
export default SignUp
