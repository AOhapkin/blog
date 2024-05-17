import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v1 as uuidv1 } from 'uuid';
import { Pagination } from "antd";

import classes from './ArticlesList.module.scss'
import { fetchDataByPage } from '../../redux/actions/actionCreators'
import ArticlesListItem from '../ArticlesListItem/ArticlesListItem'
import ErrorAlert from '../ErrorAlert/ErrorAlert'
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner'

const ArticlesList = () => {
  const articlesReducers = useSelector((state) => state.articlesReducers)
  const { articles, articlesCount, error, loading, statusDelete, statusEdit, statusCreate } = articlesReducers
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(currentPage)
    dispatch(fetchDataByPage(currentPage))
  }, [dispatch, currentPage, statusDelete, statusEdit, statusCreate])

  return (
    <main className={classes.main}>
      {error ? <ErrorAlert message={error} /> : null}
      {loading && !error ? <LoadingSpinner /> : null}
      <ul className={classes.main__list}>
        {articles.map((item) => 
          <ArticlesListItem item={item} key={uuidv1()} />
        )}
      </ul>
      <div className={classes.main__pagination}>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          defaultPageSize={5}
          total={articlesCount}
          showSizeChanger={false}
          onChange={(val) => setCurrentPage(val)}
        />
      </div>
    </main>
  )
}

export default ArticlesList
