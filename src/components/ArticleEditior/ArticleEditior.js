import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

import {
  createNewArticle,
  getArticleForEdit,
  updateArticle,
} from '../../redux/actions/actionCreators'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'
import classes from './ArticleEditior.module.scss'

const ArticleEditior = () => {
  const loading = useSelector((state) => state.reducerArticles.loading)
  const error = useSelector((state) => state.reducerArticles.error)
  const article = useSelector((state) => state.reducerArticles.article)
  const statusCreate = useSelector(
    (state) => state.reducerArticles.statusCreate,
  )
  const statusEdit = useSelector((state) => state.reducerArticles.statusEdit)
  const { title, description, body, tagList } = article
  const history = useHistory()
  const path = history.location.pathname
  const { slug } = useParams()
  const dispatch = useDispatch()
  const {
    register,
    resetField,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    reset,
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: '',
      description: '',
      body: '',
      tag: '',
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tagList',
  })

  const onSubmit = (dataArticle) => {
    const { title, description, body, tagList } = dataArticle
    const formatTagList = tagList.map((el) => el.tag)
    const article = {
      article: {
        title: title,
        description: description,
        body: body,
        tagList: formatTagList,
      },
    }
    if (path === '/new-article') dispatch(createNewArticle(article))
    else {
      dispatch(updateArticle(article, slug))
    }
  }

  useEffect(() => {
    if (path === '/new-article') {
      if (path === '/new-article' && statusCreate) {
        history.push('/articles')
      }
      reset()
      remove(0)
    }
    if (path !== '/new-article') {
      if (path !== '/new-article' && statusEdit) {
        history.push('/articles')
      }
      
      dispatch(getArticleForEdit(slug))
      setValue('title', title)
      setValue('description', description)
      setValue('body', body)
      remove(0)
      tagList.forEach((tag) => {
        append({ tag })
      })
    }
  }, [path, history, title, statusCreate, statusEdit, reset, remove, dispatch, slug, setValue, description, body, tagList, append])

  return (
    <>
      {error ? <ErrorAlert message={error} /> : null}
      {loading && !error ? <LoadingSpinner /> : null}
      <div className={classes.article}>
        {path !== '/new-article' ? (
          <h1 className={classes.article__title}>Edit article</h1>
        ) : null}
        {path === '/new-article' ? (
          <h1 className={classes.article__title}>Create new article</h1>
        ) : null}
        <form
          className={classes.article__forms}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className={classes.article__label} htmlFor="title">
            Title
          </label>
          <input
            className={`${classes.article__input_title} ${
              errors.title ? classes.article__input_error : ''
            }`}
            placeholder="Title"
            id="title"
            autoComplete="off"
            {...register('title', {
              required: 'This field is required',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => {
              return <p className={classes.error_message}>{message}</p>
            }}
          />
          <label className={classes.article__label} htmlFor="description">
            Short description
          </label>
          <input
            className={`${classes.article__input_description} ${
              errors.description ? classes.article__input_error : ''
            }`}
            placeholder="Title"
            type="text"
            id="description"
            autoComplete="off"
            {...register('description', {
              required: 'This field is required',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="description"
            render={({ message }) => (
              <p className={classes.error_message}>{message}</p>
            )}
          />
          <label className={classes.article__label} htmlFor="body">
            Text
          </label>
          <input
            className={`${classes.article__input_body} ${
              errors.body ? classes.article__input_error : ''
            }`}
            placeholder="Text"
            type="textarea"
            id="body"
            autoComplete="off"
            {...register('body', {
              required: 'This field is required',
            })}
          />
          <ErrorMessage
            errors={errors}
            name="body"
            render={({ message }) => (
              <p className={classes.error_message}>{message}</p>
            )}
          />

          <ul className={classes.article__list_tags}>
            <label className={classes.article__label} htmlFor="newTag">
              Tags
            </label>
            {fields.map((item, index) => {
              return (
                <li className={classes.article__list_tags_item} key={item.id}>
                  <input
                    className={classes.article__input_tag}
                    defaultValue={item.tag}
                    {...register(`tagList.${index}.tag`, { required: true })}
                  />
                  <button
                    className={classes.article__button_del}
                    type="button"
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </li>
              )
            })}
          </ul>
          <div className={classes.article__list_tags_item}>
            <input
              className={classes.article__input_tag}
              placeholder="Tag"
              {...register('newTag')}
            />
            <button
              className={classes.article__button_del}
              type="button"
              disabled={true}
            >
              Delete
            </button>
            <button
              className={classes.article__button_add}
              type="button"
              onClick={() => {
                const newTagValue = getValues('newTag')
                if (newTagValue.trim() !== '') {
                  append({ tag: newTagValue })
                }
                resetField('newTag')
              }}
            >
              Add tag
            </button>
          </div>
          <button className={classes.article__button_submit} type="submit">
            Send
          </button>
        </form>
      </div>
    </>
  )
}

export default ArticleEditior