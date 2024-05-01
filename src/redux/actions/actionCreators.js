import {
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
} from './actionTypes'
import getArticlesByPage from '../../service/getArticles'

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