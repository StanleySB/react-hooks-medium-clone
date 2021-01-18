//Core
import { useContext, useEffect } from 'react';
//Hooks
import useFetch from '../hooks/useFetch';
import useLocalStorage from '../hooks/useLocalStorage';
//Context
import { CurrentUserContext } from '../contexts/currentUser';

const CurrentUserChecker = ({ children }) => {
  const [{ response, error }, doFetch] = useFetch('/user');
  const [, dispatch] = useContext(CurrentUserContext);
  const [token, setToken] = useLocalStorage('token');

  useEffect(() => {
    if (!token) {
      dispatch({ type: 'SET_UNAUTHORIZED' });
      return;
    }

    doFetch();
    dispatch({ type: 'LOADING' });
  }, [dispatch, token, doFetch]);

  useEffect(() => {
    console.log(response, error);
    if (error !== null) {
      setToken('');
      dispatch({ type: 'SET_UNAUTHORIZED' });
    }
    if (!response) return;
    dispatch({ type: 'SET_AUTHORIZED', payload: response.user });
  }, [response, dispatch, error, setToken]);

  return children;
};

export default CurrentUserChecker;
