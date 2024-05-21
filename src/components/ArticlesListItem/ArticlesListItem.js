import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { v1 as uuidv1 } from 'uuid';

import classes from './ArticlesListItem.module.scss'
import { formatDate } from '../../utilities/utilities';
import { likeArticle, unlikeArticle } from '../../redux/actions/actionCreators'
import { truncateString } from '../../utilities/utilities'

const ArticlesListItem = ({ item }) => {
  const {
    author,
    createdAt,
    description,
    favorited,
    favoritesCount,
    slug,
    tagList,
    title,
  } = item
  const { username, image } = author
  const isLogin = useSelector((state) => state.userReducers.isLogin)
  const dispatch = useDispatch()
  
  useEffect(() => {}, [slug, favorited, favoritesCount, isLogin])

  const handleLikeClick = () => {
    !favorited ? dispatch(likeArticle(slug)) : dispatch(unlikeArticle(slug))
  }

  return (
    <li className={classes.item}>
      <div className={classes.item__box_info}>
        <div className={classes.item__box_title}>
          <Link to={`/articles/${slug}`}>
            <h5 className={classes.item__title}>{truncateString(title, 50)}</h5>
          </Link>
          <label className={classes.item__label_button}>
            <button
              className={
                favorited && isLogin
                  ? classes.item__button_like_active
                  : classes.item__button_like
              }
              onClick={() => handleLikeClick()}
              disabled={!isLogin}
            ></button>
            <p className={classes.item__counter_like}>{favoritesCount}</p>
          </label>
        </div>
        <ul className={classes.item__tags_list}>
          {tagList.map((el) => {
            return (
              <li className={classes.item__tags_item} key={uuidv1()}>
                {el}
              </li>
            )
          })}
        </ul>
        <p className={classes.item__description}>{description}</p>
      </div>

      <div className={classes.item__box_author}>
        <span className={classes.item__span_name_date}>
          <p className={classes.item__author_name}>{username}</p>
          <p className={classes.item__date_created}>
            {formatDate(createdAt)}
          </p>
        </span>
        <img
          className={classes.item__avatar}
          src={image}
          alt="user avatar"
        />
      </div>
    </li>
  )
}

export default ArticlesListItem
