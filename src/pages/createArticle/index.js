import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import ArticleForm from '../../components/articleForm';
import { CurrentUserContext } from '../../contexts/currentUser';
import useFetch from '../../hooks/useFetch';

const CreateArticle = () => {
  const [currentUserState] = useContext(CurrentUserContext);
  const apiUrl = '/articles';
  const [{ response, error }, doFetch] = useFetch(apiUrl);
  const initialValues = {
    title: '',
    description: '',
    body: '',
    tagList: [],
  };
  const [isSuccessfullSubmit, setIsSuccessfullSubmit] = useState(false);

  const handleSubmit = (article) => {
    doFetch({
      method: 'post',
      data: { article },
    });
  };

  useEffect(() => {
    if (!response) return;
    setIsSuccessfullSubmit(true);
  }, [response]);

  if (currentUserState.isLoggedIn === false) {
    return <Redirect to="/" />;
  }

  if (isSuccessfullSubmit) {
    return <Redirect to={`/articles/${response.article.slug}`} />;
  }

  return (
    <div>
      <ArticleForm
        initialValues={initialValues}
        errors={(error && error.errors) || {}}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CreateArticle;
