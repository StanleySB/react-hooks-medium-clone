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
import EditArticle from './pages/editArticle';
import Settings from './pages/settings';
import UserProfile from './pages/userProfile';

export default () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/feed" exact component={YourFeed} />
      <Route path="/tags/:slug" component={TagFeed} />
      <Route path="/article/new" component={CreateArticle} />
      <Route path="/articles/:slug" exact component={Article} />
      <Route path="/articles/:slug/edit" component={EditArticle} />
      <Route path="/settings" component={Settings} />
      <Route path="/profiles/:slug" component={UserProfile} />
      <Route path="/profiles/:slug/favorites" component={UserProfile} />
      <Route path="/login" exact component={Authentication} />
      <Route path="/register" component={Authentication} />
    </Switch>
  );
};
