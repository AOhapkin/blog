import { Route, BrowserRouter as Router, Switch } from 'react-router-dom/cjs/react-router-dom.min';
// import Header from '../Header/Header';
import ArticlesList from '../ArticlesList/ArticlesList'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ArticlesList}/>
        <Route exact path="/articles" component={ArticlesList}/>
      </Switch>
    </Router>
  )
}

export default App;
