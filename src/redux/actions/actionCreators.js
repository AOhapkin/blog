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
  PUT_PROFILE_UPDATE_REQUEST,
  PUT_PROFILE_UPDATE_SUCCESS,
  PUT_PROFILE_UPDATE_FAILURE,
  PUT_PROFILE_UPDATE_SERVER_FAIL,
  POST_NEW_ARTICLE_REQUEST,
  POST_NEW_ARTICLE_SUCCESS,
  POST_NEW_ARTICLE_FAILURE,
  POST_NEW_ARTICLE_SERVER_FAIL,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_REQUEST,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_FAILURE,
  PUT_EDIT_ARTICLE_REQUEST,
  PUT_EDIT_ARTICLE_SUCCES,
  PUT_EDIT_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE_SERVER_FAIL,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SERVER_FAIL,
  POST_ARTICLE_LIKE,
  DELETE_ARTICLE_LIKE
} from './actionTypes'
import getArticlesByPage from '../../service/getArticlesByPage'
import getArticle from '../../service/getArticle'
import blogAxiosInstance from '../../service/axios'
import postNewUser from '../../service/postNewUser'
import postLoginUser from '../../service/postLoginUser'
import getCurrentUser from '../../service/getCurrentUser'
import sendProfileUpdate from '../../service/sendProfileUpdate'
import postCreateNewArticle from '../../service/postCreateNewArticle'
import putUpdateArticle from '../../service/putUpdateArticle'
import deleteArticleRequest from '../../service/deleteArticleRequest'
import postFavoriteArticleRequest from '../../service/postFavoriteArticleRequest'
import deleteArticleLikeRequest from '../../service/deleteArticleLikeRequest'

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

export const fetchData = (page) => {
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

// Profile edit

export const putUpdateUserRequest = () => ({ type: PUT_PROFILE_UPDATE_REQUEST })
export const putUpdateUserSuccess = (user) => ({
  type: PUT_PROFILE_UPDATE_SUCCESS,
  payload: user,
})
export const putUpDateUserFail = (error) => ({
  type: PUT_PROFILE_UPDATE_FAILURE,
  payload: error,
})
export const putUpdateUserServerFail = (error) => ({
  type: PUT_PROFILE_UPDATE_SERVER_FAIL,
  payload: error,
})

export const updateUser = (dataUser) => {
  return async (dispatch) => {
    try {
      dispatch(putUpdateUserRequest())
      const res = await sendProfileUpdate(dataUser)
      const { user } = res.data
      dispatch(putUpdateUserSuccess(user))
    } catch (error) {
      if (error.message === '422') dispatch(putUpdateUserServerFail(error))
      else dispatch(putUpDateUserFail(error.message))
    }
  }
}

// New article

export const postArticle = () => ({ type: POST_NEW_ARTICLE_REQUEST })

export const postArticleSuccess = (article) => ({
  type: POST_NEW_ARTICLE_SUCCESS,
  payload: article,
})

export const postArticleFail = (error) => ({
  type: POST_NEW_ARTICLE_FAILURE,
  payload: error,
})

export const postArticleServerFail = (error) => ({
  type: POST_NEW_ARTICLE_SERVER_FAIL,
  payload: error,
})

export const createNewArticle = (newArticleData) => {
  return async (dispatch) => {
    try {
      dispatch(postArticle())
      const res = await postCreateNewArticle(newArticleData)
      const { article } = res.data
      dispatch(postArticleSuccess(article))
    } catch (error) {
      if (error.message === '422') dispatch(postArticleServerFail(error))
      else dispatch(postArticleFail(error.message))
    }
  }
}

// Get article for edit

export const fetchArticleSlugEditRequest = () => ({
  type: FETCH_ARTICLE_BY_SLUG_FOR_EDIT_REQUEST,
})
export const fetchArticleSlugEditSuccess = (article) => ({
  type: FETCH_ARTICLE_BY_SLUG_FOR_EDIT_SUCCESS,
  payload: article,
})
export const fetchArticleSlugEditFail = (error) => ({
  type: FETCH_ARTICLE_BY_SLUG_FOR_EDIT_FAILURE,
  payload: error,
})

export const getArticleForEdit = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchArticleSlugEditRequest())
      const res = await getArticle(slug)
      const { article } = res.data
      dispatch(fetchArticleSlugEditSuccess(article))
    } catch (error) {
      dispatch(fetchArticleSlugEditFail(error.message))
    }
  }
}

// Article edit

export const putEditArticle = () => ({ type: PUT_EDIT_ARTICLE_REQUEST })

export const putEditArticleSuccess = () => ({
  type: PUT_EDIT_ARTICLE_SUCCES,
})

export const putEditArticleFail = (error) => ({
  type: PUT_EDIT_ARTICLE_FAILURE,
  payload: error,
})

export const putEditArticleServerFail = (error) => ({
  type: PUT_EDIT_ARTICLE_SERVER_FAIL,
  payload: error,
})

export const updateArticle = (articleUpdatedData, slug) => {
  return async (dispatch) => {
    try {
      dispatch(putEditArticle())
      await putUpdateArticle(articleUpdatedData, slug)
      dispatch(putEditArticleSuccess())
    } catch (error) {
      if (error.message === '422') 
        dispatch(putEditArticleServerFail(error))
      else 
        dispatch(putEditArticleFail(error.message))
    }
  }
}

// Delete article

export const fetchDeleteArticle = () => ({ type: DELETE_ARTICLE_REQUEST })

export const fetchDeleteArticleSuccess = () => ({
  type: DELETE_ARTICLE_SUCCESS,
})

export const fetchDeleteArticleFail = (error) => ({
  type: DELETE_ARTICLE_FAILURE,
  payload: error,
})

export const fetchDeleteArticleServerFail = (error) => ({
  type: DELETE_ARTICLE_SERVER_FAIL,
  payload: error,
})

export const deleteArticle = (slug) => {
  return async (dispatch) => {
    try {
      dispatch(fetchDeleteArticle())
      await deleteArticleRequest(slug)
      dispatch(fetchDeleteArticleSuccess())
    } catch (error) {
      if (error.message === '422')
        dispatch(fetchDeleteArticleServerFail(error))
      else
        dispatch(fetchDeleteArticleFail(error.message))
    }
  }
}

// Like

export const postArticleLike = (article) => ({
  type: POST_ARTICLE_LIKE,
  payload: article,
})

export const deleteArticleLike = (article) => ({
  type: DELETE_ARTICLE_LIKE,
  payload: article,
})

export const likeArticle = (slug) => {
  return async (dispatch) => {
    try {
      const res = await postFavoriteArticleRequest(slug)
      const { article } = res.data
      dispatch(postArticleLike(article))
    } catch (error) {
      // add like fail
      console.error(error)
    }
  }
}

export const unlikeArticle = (slug) => {
  return async (dispatch) => {
    try {
      const res = await deleteArticleLikeRequest(slug)
      const { article } = res.data
      dispatch(deleteArticleLike(article))
    } catch (error) {
      // add unlike fail
      console.error(error)
    }
  }
}
