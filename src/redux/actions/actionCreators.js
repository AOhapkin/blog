import {
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ARTICLE_BY_SLUG_REQUEST,
  FETCH_ARTICLE_BY_SLUG_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FAILURE,
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
} from './actionTypes'
import getArticlesByPage from '../../service/getArticles'
import getArticle from '../../service/getArticle'
import blogAxiosInstance from '../../service/axios'
import postNewUser from '../../service/postNewUser'
import postLoginUser from '../../service/postLoginUser'
import getCurrentUser from '../../service/getCurrentUser'

// All articles
export const fetchArticlesRequest = () => ({
  type: FETCH_ALL_ARTICLES_REQUEST,
})

export const fetchArticlesSuccess = (articles, articlesCount) => ({
  type: FETCH_ALL_ARTICLES_SUCCESS,
  payload: { articles, articlesCount },
})

export const fetchArticlesFailure = (error) => ({
  type: FETCH_ALL_ARTICLES_FAILURE,
  payload: error,
})

export const fetchDataByPage = (page) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticlesRequest())
      const res = await getArticlesByPage(page)
      const { articles, articlesCount } = res.data
      dispatch(fetchArticlesSuccess(articles, articlesCount))
    } catch (error) {
      dispatch(fetchArticlesFailure(error.message))
    }
  }
}

// Get article by slug
export const fetchArticleSlugRequest = () => ({
  type: FETCH_ARTICLE_BY_SLUG_REQUEST,
})
export const fetchArticleSlugSuccess = (article) => ({
  type: FETCH_ARTICLE_BY_SLUG_SUCCESS,
  payload: article,
})
export const fetchArticleSlugFail = (error) => ({
  type: FETCH_ARTICLE_BY_SLUG_FAILURE,
  payload: error,
})

export const fetchArticleBySlug = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticleSlugRequest())
      const res = await getArticle(slug)
      const { article } = res.data
      dispatch(fetchArticleSlugSuccess(article))
    } catch (error) {
      dispatch(fetchArticleSlugFail(error.message))
    }
  }
}

// Create new account
export const postCreateNewAcc = () => ({ type: POST_CREATE_NEW_ACCOUNT_REQUEST })
export const postCreateNewAccSuccess = (user) => ({
  type: POST_NEW_ACCOUNT_SUCCESS,
  payload: user,
})
export const postCreateNewAccFail = (error) => ({
  type: POST_NEW_ACCOUNT_FAILURE,
  payload: error,
})
export const postCreateNewAccServerFail = (error) => ({
  type: POST_NEW_ACCOUNT_SERVER_FAIL,
  payload: error,
})

export const registerNewUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(postCreateNewAcc())
      const res = await postNewUser(dataUser)
      const { user } = res.data
      dispatch(postCreateNewAccSuccess(user))
    } catch (error) {
      if (error.response.status === 422)
        dispatch(postCreateNewAccServerFail(error.response.data))
      else dispatch(postCreateNewAccFail(error.message))
    }
  }
}

// Login
export const postLogin = () => ({ type: POST_LOGIN_REQUEST })
export const postLoginSuccess = (user) => ({
  type: POST_LOGIN_SUCCES,
  payload: user,
})
export const postLoginFail = (error) => ({
  type: POST_LOGIN_FAILURE,
  payload: error,
})

export const postLoginServerFail = (error) => ({
  type: POST_LOGIN_SERVER_FAIL,
  payload: error,
})

export const loginUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(postLogin())
      const res = await postLoginUser(dataUser)
      const { user } = res.data
      const { token } = user
      if (token !== localStorage.getItem('token')) {
        localStorage.setItem('token', token)
        blogAxiosInstance.defaults.headers.Authorization = `Token ${token}`
      }
      dispatch(postLoginSuccess(user))
    } catch (error) {
      if (error.message === '422')
        dispatch(postLoginServerFail(error))
      else
        dispatch(postLoginFail(error.message))
    }
  }
}

// Logout
export const logout = () => ({ type: LOGOUT })

// Get Current User
export const setCurrentUser = (user) => ({ type: GET_CURRENT_USER, payload: user })

export const setCurrentUserAction = () => {
  return async (dispatch) => {
    try {
      const res = await getCurrentUser()
      const { user } = res.data
      dispatch(setCurrentUser(user))
    } catch (error) {
      console.log(error)
    }
  }
}
