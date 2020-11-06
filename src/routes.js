//Core
import { Switch, Route } from 'react-router-dom';
import React from 'react';
//Components
import GlobalFeed from './pages/globalFeed';
import TagFeed from './pages/tagFeed';
import Article from './pages/article';
import Authentication from './pages/authentication';
import YourFeed from './pages/yourFeed';
import CreateArticle from './pages/createArticle';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/feed" exact component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/articles/new" component={CreateArticle} />
      <Route path="/login" exact component={Authentication} />
      <Route path="/register" component={Authentication} />
      <Route path="/articles/:slug" component={Article} />
    </Switch>
  );
};
