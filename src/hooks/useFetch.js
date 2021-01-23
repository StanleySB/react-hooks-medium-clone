import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import useLocalStorage from './useLocalStorage';

export default (url) => {
  const baseUrl = 'https://conduit.productionready.io/api';
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [options, setOptions] = useState({});
  const [token] = useLocalStorage('token');

  const doFetch = useCallback((options = {}) => {
    setOptions(options);
    setIsLoading(true);
  }, []);

  useEffect(() => {
    let skipGetResponseAutoDestroy = false;
    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    };

    if (!isLoading) return;
    axios(baseUrl + url, requestOptions)
      .then((res) => {
        if (!skipGetResponseAutoDestroy) {
          setIsLoading(false);
          setResponse(res.data);
        }
      })
      .catch((error) => {
        if (!skipGetResponseAutoDestroy) {
          setIsLoading(false);
          setError(error.response.data);
        }
      });
    return () => {
      skipGetResponseAutoDestroy = true;
    };
  }, [isLoading, options, url, token]);

  return [
    {
      isLoading,
      response,
      error,
    },
    doFetch,
  ];
};
