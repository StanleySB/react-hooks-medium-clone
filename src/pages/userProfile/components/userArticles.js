import { stringify } from 'query-string';
import React, { useEffect } from 'react';
import { Fragment } from 'react';
import ErrorMessage from '../../../components/errorMessage';
import Feed from '../../../components/feed';
import Loading from '../../../components/loading';
import Pagination from '../../../components/pagination';
import useFetch from '../../../hooks/useFetch';
import { getPaginator, limit } from '../../../utils';

const getApiUrl = ({ username, offset, isFavorites }) => {
  const params = isFavorites
    ? { limit, offset, favorited: username }
    : { limit, offset, author: username };

  return `/articles?${stringify(params)}`;
};

const UserArticles = ({ username, location, isFavorites, url }) => {
  const { offset, currentPage } = getPaginator(location.search);
  const apiUrl = getApiUrl({ username, offset, isFavorites });
  const [{ response, isLoading, error }, doFetch] = useFetch(apiUrl);

  useEffect(() => doFetch(), [doFetch, isFavorites, offset]);

  return (
    <div>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {!isLoading && response && (
        <Fragment>
          <Feed articles={response.articles} />
          <Pagination
            total={response.articlesCount}
            limit={limit}
            url={url}
            currentPage={currentPage}
          />
        </Fragment>
      )}
    </div>
  );
};

export default UserArticles;
