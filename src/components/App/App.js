import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList'
import ArticlePage from '../ArticlePage/ArticlePage';

const App = () => {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={ArticlesList}/>
        <Route exact path="/articles" component={ArticlesList}/>
        <Route exact path="/articles/:slug" component={ArticlePage} />
        {/* <Route exact path="/sign-in" component={SignIn} /> */}
        {/* <Route exact path="/sign-up" component={SignUp} /> */}
      </Switch>
    </Router>
  )
}

export default App;
