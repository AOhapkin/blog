import React, { useEffect } from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import { v1 as uuidv1 } from 'uuid';

import classes from './ArticlesListItem.module.scss'
import { formatDate } from '../../utilities/utilities';

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
  
  useEffect(() => {}, [slug, favorited, favoritesCount])

  return (
    <li className={classes.item}>
      <div className={classes.item__box_info}>
        <div className={classes.item__box_title}>
          <Link to={`/articles/${slug}`}>
            <h5 className={classes.item__title}>{title}</h5>
          </Link>
          <label className={classes.item__label_button}>
            <button
              className={
                favorited
                  ? classes.item__button_like_active
                  : classes.item__button_like
              }
            ></button>
            <p className={classes.item__counter_like}>{favoritesCount}</p>
          </label>
        </div>
        <div className={classes.item__box_tags}>
          {tagList.map((el) => {
            return (
              <p className={classes.item__tag} key={uuidv1()}>
                {el}
              </p>
            )
          })}
        </div>
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
          alt="avatar"
        />
      </div>
    </li>
  )
}

export default ArticlesListItem
