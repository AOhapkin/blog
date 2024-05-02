import {
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ARTICLE_BY_SLUG_REQUEST,
  FETCH_ARTICLE_BY_SLUG_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FAILURE,
} from './actionTypes'
import getArticlesByPage from '../../service/getArticles'
import getArticle from '../../service/getArticle'

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