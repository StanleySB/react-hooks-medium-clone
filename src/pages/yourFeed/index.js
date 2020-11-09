import React, { useEffect } from 'react';
import { stringify } from 'query-string';

import useFetch from '../../hooks/useFetch';
import { limit, getPaginator } from '../../utils';

import Feed from '../../components/feed';
import Pagination from '../../components/pagination';
import PopularTags from '../../components/popularTags';
import Loading from '../../components/loading';
import ErrorMessage from '../../components/errorMessage';
import FeedToggler from '../../components/feedToggler';

const YourFeed = ({ location, match }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const stringifydParams = stringify({
    limit,
    offset,
  });
  const apiUrl = `/articles/feed?${stringifydParams}`;
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);
  const url = match.url;

  console.log('test');
  useEffect(() => {
    doFetch();
  }, [doFetch, currentPage]);

  return (
    <div className="home-page">
      <div className="banner">
        <div className="container">
          <h1>Medium Clone</h1>
          <p>A place to share knowledge</p>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <FeedToggler />
            {isLoading && <Loading />}
            {error && <ErrorMessage />}
            {!isLoading && response && (
              <React.Fragment>
                <Feed articles={response.articles} />
                <Pagination
                  total={response.articlesCount}
                  limit={limit}
                  url={url}
                  currentPage={currentPage}
                />
              </React.Fragment>
            )}
          </div>
          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourFeed;
