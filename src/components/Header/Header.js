import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import classes from './Header.module.scss'
import defaultUserAvatar from '../../resources/defaultUserAvatar.svg'
import { setCurrentUserAction, logout } from '../../redux/actions/actionCreators'

const Header = () => {
  const isLogin = useSelector((state) => state.userReducers.isLogin)
  const currentUsername = useSelector((state) => state.userReducers.user.username)
  const currentImage = useSelector((state) => state.userReducers.user.image)
  const history = useHistory()
  const dispatch = useDispatch()
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(setCurrentUserAction())
    }
  }, [dispatch, history, isLogin, currentUsername, currentImage, token])

  const onLogoutButtonClickHandler = () => {
    dispatch(logout())
    localStorage.removeItem('token')
    history.push('/articles')
  }

  return (
    <header className={classes.header}>
      <Link className={classes.header__title} to="/articles">
        Realworld Blog
      </Link>
      {!isLogin ? (
        <div className={classes.header__box_un_login}>
          <Link to="/sign-in" className={classes.header__link_sign_in}>
            Sign In
          </Link>
          <Link to="/sign-up" className={classes.header__link_sign_up}>
            Sign Up
          </Link>
        </div>
      ) : (
        <div className={classes.header__box_on_login}>
          <Link to="/new-article" className={classes.header__button_create}>
            Create article
          </Link>
          <div className={classes.header__box_profile}>
            <Link to="/profile" className={classes.header__link_username}>
              {currentUsername}
            </Link>
            <img
              className={classes.header__profile_avatar}
              src={currentImage}
              alt="user avatar"
              onError={(e) => {
                e.target.src = defaultUserAvatar;
              }}
            />
          </div>
          <button
            className={classes.header__button_logout}
            onClick={() => onLogoutButtonClickHandler()}
          >
            Log out
          </button>
        </div>
      )}
    </header>
  )
}

export default Header