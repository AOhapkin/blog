import {
  FETCH_ALL_ARTICLES_FAILURE,
  FETCH_ALL_ARTICLES_REQUEST,
  FETCH_ALL_ARTICLES_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_REQUEST,
  FETCH_ARTICLE_BY_SLUG_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FAILURE,
  POST_NEW_ARTICLE_REQUEST,
  POST_NEW_ARTICLE_SUCCESS,
  POST_NEW_ARTICLE_FAILURE,
  POST_NEW_ARTICLE_SERVER_FAIL,
  PUT_EDIT_ARTICLE_REQUEST,
  PUT_EDIT_ARTICLE_SUCCES,
  PUT_EDIT_ARTICLE_FAILURE,
  PUT_EDIT_ARTICLE_SERVER_FAIL,
  DELETE_ARTICLE_REQUEST,
  DELETE_ARTICLE_SUCCESS,
  DELETE_ARTICLE_FAILURE,
  DELETE_ARTICLE_SERVER_FAIL,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_REQUEST,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_SUCCESS,
  FETCH_ARTICLE_BY_SLUG_FOR_EDIT_FAILURE,
  POST_ARTICLE_LIKE,
  DELETE_ARTICLE_LIKE,
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
  statusCreate: false,
  statusEdit: false,
  statusDelete: false,
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
        statusCreate: false,
        statusEdit: false,
        statusDelete: false,
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
        // Create new article
        case POST_NEW_ARTICLE_REQUEST:
          return { ...state, loading: true, error: null }
        case POST_NEW_ARTICLE_SUCCESS:
          return { ...state, loading: false, error: null, statusCreate: true, statusEdit: false }
        case POST_NEW_ARTICLE_FAILURE:
          return { ...state, loading: false, error: action.payload }
        case POST_NEW_ARTICLE_SERVER_FAIL:
          return { ...state, loading: false, server: action.payload }
        // Fetch article by slug FOR EDIT
        case FETCH_ARTICLE_BY_SLUG_FOR_EDIT_REQUEST:
          return { ...state, loading: true, error: null }
        case FETCH_ARTICLE_BY_SLUG_FOR_EDIT_SUCCESS:
          return {
            ...state,
            loading: false,
            article: { ...action.payload },
            flag: true,
          }
        case FETCH_ARTICLE_BY_SLUG_FOR_EDIT_FAILURE:
          return { ...state, loading: false, error: action.payload }
        // Edit article
        case PUT_EDIT_ARTICLE_REQUEST:
          return { ...state, loading: true, error: null }
        case PUT_EDIT_ARTICLE_SUCCES:
          return { ...state, loading: false, error: null, statusEdit: true, statusCreate: false }
        case PUT_EDIT_ARTICLE_FAILURE:
          return { ...state, loading: false, error: action.payload }
        case PUT_EDIT_ARTICLE_SERVER_FAIL:
          return { ...state, loading: false, server: action.payload }
        // Delete article
        case DELETE_ARTICLE_REQUEST:
          return { ...state, loading: true, error: null }
        case DELETE_ARTICLE_SUCCESS:
          return { ...state, loading: false, error: null, statusDelete: true, statusEdit: false, statusCreate: false }
        case DELETE_ARTICLE_FAILURE:
          return { ...state, loading: false, error: action.payload }
        case DELETE_ARTICLE_SERVER_FAIL:
          return { ...state, loading: false, server: action.payload }
        // Like 
        case POST_ARTICLE_LIKE:
          return {
            ...state,
            articles: state.articles.map((el) => {
              if (el.slug === action.payload.slug)
                return {
                  ...el,
                  favorited: true,
                  favoritesCount: action.payload.favoritesCount,
                }
              return el
            }),
            article: action.payload,
          }
        case DELETE_ARTICLE_LIKE:
          return {
            ...state,
            articles: state.articles.map((el) => {
              if (el.slug === action.payload.slug)
                return {
                  ...el,
                  favorited: false,
                  favoritesCount: action.payload.favoritesCount,
                }
              return el
            }),
            article: action.payload,
          }
    default:
      return state
  }
}

export default articlesReducers
