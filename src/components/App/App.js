import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList'
import ArticlePage from '../ArticlePage/ArticlePage';
import SignIn from '../SignIn/SignIn'
import SignUp from '../SignUp/SignUp'
import ProfileEditor from '../ProfileEditor/ProfileEditor'
import ArticleEditior from '../ArticleEditior/ArticleEditior'

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticlesList}/>
        <Route exact path="/articles" component={ArticlesList}/>
        <Route exact path="/articles/:slug" component={ArticlePage} />
        <Route exact path="/sign-in" component={SignIn} />
        <Route exact path="/sign-up" component={SignUp} />
        <Route exact path="/profile" component={ProfileEditor} />
        <Route exact path="/new-article" component={ArticleEditior} />
        <Route exact path="/articles/:slug/edit" component={ArticleEditior} />
      </Switch>
    </Router>
  )
}

export default App;
