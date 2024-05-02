import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
// import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList'
import ArticlePage from '../ArticlePage/ArticlePage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ArticlesList}/>
        <Route exact path="/articles" component={ArticlesList}/>
        <Route exact path="/articles/:slug" component={ArticlePage} />
      </Switch>
    </Router>
  )
}

export default App;
