import React, { useEffect } from 'react'
import { useParams, useHistory, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v1 as uuidv1 } from 'uuid';
import Markdown from 'react-markdown'
import { message, Popconfirm } from 'antd'

import classes from './ArticlePage.module.scss'
import { formatDate } from '../../utilities/utilities';
import {
  fetchArticleBySlug,
  deleteArticle,
  likeArticle,
  unlikeArticle,
} from '../../redux/actions/actionCreators'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const ArticlePage = () => {
  const isLogin = useSelector((state) => state.reducerUser.isLogin)
  const user = useSelector((state) => state.reducerUser.user.username)
  const article = useSelector((state) => state.reducerArticles.article)
  const loading = useSelector((state) => state.reducerArticles.loading)
  const error = useSelector((state) => state.reducerArticles.error)

  const { slug } = useParams()

  const dispatch = useDispatch()
  const history = useHistory()
  const {
    author,
    title,
    favorited,
    favoritesCount,
    tagList,
    description,
    createdAt,
    body,
  } = article
  const { username, image } = author
  const markdown = body

  const handleLikeClick = () => {
    !favorited ? dispatch(likeArticle(slug)) : dispatch(unlikeArticle(slug))
  }

  const confirmDeletion = () => {
    message.success('Пост удален')
    dispatch(deleteArticle(slug))
    history.push('/articles')
  }
  const cancelDeletion = () => {
    message.error('Отмена удаления поста')
  }

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [dispatch, isLogin, slug])

  return (
    <>
      {error ? <ErrorAlert message={error} /> : null}
      {loading && !error ? <LoadingSpinner /> : null}
      <section className={classes.article}>
        <div className={classes.article__header}>
          <div className={classes.article__info}>
            <div className={classes.article__title_wrapper}>
              <h5 className={classes.article__title}>{title}</h5>
              <div className={classes.article__likes_wrapper}>
                <button
                  className={
                    favorited
                      ? classes.article__like_button_active
                      : classes.article__like_button
                  }
                  disabled={!isLogin ? true : false}
                  onClick={() => {
                    handleLikeClick()
                  }}
                ></button>
                <p className={classes.article__likes_count}>{favoritesCount}</p>
              </div>
            </div>

            <div className={classes.article__tags_wrapper}>
              {tagList.map((el) => {
                return (
                  <span className={classes.article__tag} key={uuidv1()}>
                    {el}
                  </span>
                )
              })}{' '}
            </div>

            <span className={classes.article__description}>{description}</span>
          </div>

          <div className={classes.article__author}>
            <div className={classes.article__author_wrapper}>
              <span className={classes.article__author_info}>
                <p className={classes.article__author_name}>{username}</p>
                <p className={classes.article__date}>{formatDate(createdAt)}</p>
              </span>
              <img
                className={classes.article__author_image}
                src={image}
                alt="user avatar"
              />
            </div>
            {username === user ? (
              <div className={classes.article__author_controls}>
                <Popconfirm
                  placement="rightTop"
                  description="Are you sure to delete this article?"
                  onConfirm={confirmDeletion}
                  onCancel={cancelDeletion}
                  okText="Yes"
                  cancelText="No"
                >
                  <button className={classes.article__button_delete} type="submit">
                    Delete
                  </button>
                </Popconfirm>
                <Link
                  to={`/articles/${slug}/edit`}
                  className={classes.article__button_edit}
                >
                  Edit
                </Link>
              </div>
            ) : null}
          </div>
        </div>

        <div className={classes.article__content}>
          <Markdown>{markdown}</Markdown>
        </div>
      </section>
    </>
  )
}

export default ArticlePage
