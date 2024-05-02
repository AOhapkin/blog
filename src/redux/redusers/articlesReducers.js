import {
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_REQUEST,
  FETCH_ARTICLE_BY_SLUG_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FAILURE,
} from '../actions/actionTypes'

const articlesInitState = {
  articles: [],
  articlesCount: 0,
  loading: false,
  error: null,
  article: {
    slug: null,
    author: { username: null, image: null },
    title: null,
    favoritesCount: null,
    tagList: [],
    description: null,
    createdAt: null,
    body: null,
  },
}

const articlesReducers = (state = articlesInitState, action) => {
  switch (action.type) {
    // Fetch all articles
    case FETCH_ALL_ARTICLES_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ALL_ARTICLES_SUCCESS:
      return {
        ...state,
        articles: action.payload.articles,
        articlesCount: action.payload.articlesCount,
        loading: false,
        error: null,
      }
    case FETCH_ALL_ARTICLES_FAILURE:
      return { ...state, loading: false, error: action.payload }

      // Fetch article by slug
      case FETCH_ARTICLE_BY_SLUG_REQUEST:
        return { ...state, loading: true, error: null }
      case FETCH_ARTICLE_BY_SLUG_SUCCESS:
        return {
          ...state,
          loading: false,
          article: { ...action.payload },
        }
        case FETCH_ARTICLE_BY_SLUG_FAILURE:
          return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default articlesReducers
