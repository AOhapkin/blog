import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { v1 as uuidv1 } from 'uuid';
import { Pagination } from "antd";

import classes from './ArticlesList.module.scss'
import { fetchDataByPage } from '../../redux/actions/actionCreators'
import ArticlesListItem from '../ArticlesListItem/ArticlesListItem'

// TODO error or loading handling
const ArticlesList = () => {
  const articlesReducers = useSelector((state) => state.articlesReducers)
  const { articles, articlesCount } = articlesReducers
  const [currentPage, setCurrentPage] = useState(1)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchDataByPage(currentPage))
  }, [dispatch, currentPage])

  return (
    <main className={classes.main}>
      <ul className={classes.main_list}>
        {articles.map((item) => 
          <ArticlesListItem item={item} key={uuidv1()} />
        )}
      </ul>
      <div className={classes.main_pagination}>
        <Pagination
          defaultCurrent={1}
          current={currentPage}
          pageSize={10}
          total={articlesCount}
          showSizeChanger={false}
          onChange={(val) => setCurrentPage(val)}
        />
      </div>
    </main>
  )
}

export default ArticlesList
