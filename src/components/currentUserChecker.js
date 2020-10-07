//Core
import { useContext, useEffect } from "react";
//Hooks
import useFetch from "../hooks/useFetch";
import useLocalStorage from "../hooks/useLocalStorage";
//Context
import { CurrentUserContext } from "../contexts/currentUser";

const CurrentUserChecker = ({ children }) => {
  const [{ response }, doFetch] = useFetch("/user");
  const [, setCurrentUserState] = useContext(CurrentUserContext);
  const [token] = useLocalStorage("token");

  useEffect(() => {
    if (!token) {
      setCurrentUserState((state) => ({
        ...state,
        isLoggedIn: false,
      }));
      return;
    }

    doFetch();

    setCurrentUserState((state) => ({
      ...state,
      isLoading: true,
    }));
  }, [setCurrentUserState, token, doFetch]);

  useEffect(() => {
    if (!response) return;

    setCurrentUserState((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }));
  }, [response, setCurrentUserState]);

  return children;
};

export default CurrentUserChecker;
