import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import { updateUser } from '../../redux/actions/actionCreators'

import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import classes from './ProfileEditor.module.scss'

const ProfileEditor = () => {
  const userReducers = useSelector((state) => state.userReducers)
  const dispatch = useDispatch()
  const { user, loading, error, server } = userReducers
  const { username, email, image } = user
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      username: username,
      email: email,
      image: image,
    },
  })

  const onSubmit = (dataUser) => {
    const { username, email, password, image } = dataUser
    const user = {
      user: {
        username: username,
        email: email,
        password: password,
        image: image,
      },
    }
    dispatch(updateUser(user))
  }

  useEffect(() => {}, [loading, error])

  return (
    <>
      {error ? <ErrorAlert message={error} /> : null}
      {loading && !error ? <LoadingSpinner /> : null}
      <div className={classes.profile_edit}>
        <h1 className={classes.profile_edit__title}>Edit Profile</h1>
        <form
          className={classes.profile_edit__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={classes.profile_edit__label} htmlFor="username">
            Username
          </label>
          <input
            className={`${classes.profile_edit__input}
            ${
              errors.username || server.errors.username
                ? classes.profile_edit__input_error
                : ''
            }`}
            placeholder="Username"
            id="username"
            autoComplete="off"
            {...register('username', {
              required: 'This field is required',
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: 'Invalid characters',
              },
              minLength: {
                value: 3,
                message: 'This field must contain at least 3 characters',
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
              return (
                <p className={classes.error_message}>{message}</p>
              )
            }}
          />
          {server.errors.username ? (
            <p className={classes.error_message}>
              {server.errors.username}
            </p>
          ) : null}

          <label className={classes.profile_edit__label} htmlFor="email">
            Email address
          </label>
          <input
            className={`${classes.profile_edit__input}
            ${
              errors.email || server.errors.email
                ? classes.profile_edit__input_error
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
              <p className={classes.error_message}>{message}</p>
            )}
          />
          {server.errors.email ? (
            <p className={classes.error_message}>
              {server.errors.email}
            </p>
          ) : null}
          <label className={classes.profile_edit__label} htmlFor="password">
            Password
          </label>
          <input
            className={`${classes.profile_edit__input}
            ${errors.password ? classes.profile_edit__input_error : ''}`}
            placeholder="New password"
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
              <p className={classes.error_message}>{message}</p>
            )}
          />
          <label className={classes.profile_edit__label} htmlFor="image">
            Avatar image {'(url)'}
          </label>
          <input
            className={`${classes.profile_edit__input}
            ${
              errors.image || server.errors.email
                ? classes.profile_edit__input_error
                : ''
            }`}
            placeholder="Avatar image"
            type="text"
            id="image"
            autoComplete="off"
            {...register('image', {
              pattern: {
                value: /^(ftp|http|https):\/\/[^ "]+$/,
                message: 'Invalid URL',
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="image"
            render={({ message }) => (
              <p className={classes.error_message}>{message}</p>
            )}
          />
          <button
            className={classes.profile_edit__button_submit}
            type="submit"
            value="Create"
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default ProfileEditor
