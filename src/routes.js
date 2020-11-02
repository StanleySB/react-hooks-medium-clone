//Core
import { Switch, Route } from 'react-router-dom';
import React from 'react';
//Components
import GlobalFeed from './pages/globalFeed';
import Article from './pages/article';
import Authentication from './pages/authentication';

export default () => {
	return (
		<Switch>
			<Route path="/" exact component={GlobalFeed} />
			<Route path="/login" exact component={Authentication} />
			<Route path="/register" component={Authentication} />
			<Route path="/articles/:slug" component={Article} />
		</Switch>
	);
};
