import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux'
import React, { useEffect } from 'react'

import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList'
import ArticlePage from '../ArticlePage/ArticlePage';
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import ProfileEditor from '../ProfileEditor/ProfileEditor'
import ArticleEditior from '../ArticleEditior/ArticleEditior'

const App = () => {
  const isLogin = useSelector((state) => state.userReducers.isLogin)
  const token = localStorage.getItem('token')
  console.log(token)
  console.log(isLogin)

  useEffect(() => {}, [isLogin])

  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticlesList}/>
        <Route exact path="/articles" component={ArticlesList}/>
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <Route exact path="/sign-in" render={() => {
          if (token) {
            return <Redirect to="/" />
          } else {
            return <SignIn />
          }
        }} />
        <Route exact path="/sign-up" render={() => {
          if (token) {
            return <Redirect to="/" />
          } else {
            return <SignUp />
          }
        }} />
        <Route exact path="/profile" render={() => {
          if (!token) {
            return <Redirect to="/sign-in" />
          } else {
            return <ProfileEditor />
          }
        }} />
        <Route exact path="/new-article" render={() => {
          if (!token) {
            return <Redirect to="/sign-in" />
          } else {
            return <ArticleEditior />
          }
        }} />
        <Route exact path="/articles/:slug/edit" render={() => {
          if (!token) {
            return <Redirect to="/sign-in" />
          } else {
            return <ArticleEditior />
          }
        }} />
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
