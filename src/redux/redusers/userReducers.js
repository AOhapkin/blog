import {
  POST_CREATE_NEW_ACCOUNT_REQUEST,
  POST_NEW_ACCOUNT_SUCCESS,
  POST_NEW_ACCOUNT_FAILURE,
  POST_NEW_ACCOUNT_SERVER_FAIL,
  POST_LOGIN_REQUEST,
  POST_LOGIN_SUCCES,
  POST_LOGIN_FAILURE,
  POST_LOGIN_SERVER_FAIL,
  LOGOUT,
  GET_CURRENT_USER,
} from '../actions/actionTypes'

const userInitState = {
  user: {
    username: null,
    email: null,
    token: null,
    image: null,
  },
  server: {
    errors: {
      username: null,
      email: null,
    },
  },
  isLogin: false,
  loading: false,
  error: null,
}

const userReducers = (state = userInitState, action) => {
  switch (action.type) {
    //new account
    case POST_CREATE_NEW_ACCOUNT_REQUEST:
      return { ...state, loading: true, error: null }
    case POST_NEW_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      }
    case POST_NEW_ACCOUNT_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case POST_NEW_ACCOUNT_SERVER_FAIL:
      return { ...state, loading: false, server: action.payload }
    //login
    case POST_LOGIN_REQUEST:
      return { ...state, loading: true, error: null }
    case POST_LOGIN_SUCCES:
      return {
        ...state,
        isLogin: true,
        loading: false,
        error: null,
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        user: action.payload,
      }
    case POST_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case POST_LOGIN_SERVER_FAIL:
      return {
        ...state,
        loading: false,
        error: null,
        server: { errors: { ...action.payload } },
      }
    //logout
    case LOGOUT:
      return {
        user: {
          username: null,
          email: null,
          token: null,
          image: null,
        },
        server: {
          errors: {
            username: null,
            email: null,
          },
        },
        isLogin: false,
        loading: false,
        error: null,
      }
    case GET_CURRENT_USER:
      return { ...state, isLogin: true, user: action.payload }
    default:
      return state
  }
}

export default userReducers
