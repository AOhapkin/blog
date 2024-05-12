import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { v1 as uuidv1 } from 'uuid';
import Markdown from 'react-markdown'

import classes from './ArticlePage.module.scss'
import { formatDate } from '../../utilities/utilities';
import { fetchArticleBySlug } from '../../redux/actions/actionCreators'

const ArticlePage = () => {
  const articleData = useSelector((state) => state.articlesReducers.article)
  const { slug } = useParams()

  const dispatch = useDispatch()

  const {
    author,
    title,
    favorited,
    favoritesCount,
    tagList,
    description,
    createdAt,
    body,
  } = articleData
  const { username, image } = author
  const articleMarkdown = body

  useEffect(() => {
    dispatch(fetchArticleBySlug(slug))
  }, [dispatch, slug])

  return (
    <section className={classes.article}>
      <div className={classes.article__info_li_item}>
        <div className={classes.article__info}>
          <div className={classes.article__box_title}>
            <h5 className={classes.article__title}>{title}</h5>
            <div className={classes.article__label_favorited}>
              <button
                className={
                  favorited
                    ? classes.article__button_like_active
                    : classes.article__button_like
                }
              ></button>
              <p className={classes.article__counter_like}>{favoritesCount}</p>
            </div>
          </div>

          <div className={classes.article__box_tags}>
            {tagList.map((item) => {
              return (
                <p className={classes.article__tag} key={uuidv1()}>
                  {item}
                </p>
              )
            })}
          </div>

          <p className={classes.article__description}>{description}</p>
        </div>

        <div className={classes.article__info_author}>
          <div className={classes.article__info_author_box}>
            <span className={classes.article__box_name_date}>
              <p className={classes.article__author_name}>{username}</p>
              <p className={classes.article__date}>{formatDate(createdAt)}</p>
            </span>
            <img
              className={classes.article__author_avatar}
              src={image}
              alt="user avatar"
            />
          </div>
        </div>
      </div>

      <div className={classes.article__info_markdown}>
        <Markdown>{articleMarkdown}</Markdown>
      </div>
    </section>
  )
}

export default ArticlePage
