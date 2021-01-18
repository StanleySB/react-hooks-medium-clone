import React, { useState } from 'react';
import { useEffect } from 'react';
import BackendErrorMessages from './backendErrorMessages';

const ArticleForm = ({ initialValues, errors, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [description, setDescription] = useState('');
  const [tagList, setTagList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const article = {
      title,
      body,
      description,
      tagList,
    };
    onSubmit(article);
  };

  useEffect(() => {
    if (!initialValues) return;
    setTitle(initialValues.title);
    setBody(initialValues.body);
    setDescription(initialValues.description);
    if (initialValues.tagList) {
      setTagList(initialValues.tagList.join(','));
    }
  }, [initialValues]);

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            {errors && <BackendErrorMessages backendErrors={errors} />}

            <form onSubmit={handleSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control fomr-control-lg"
                    placeholder="Article Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control fomr-control-lg"
                    placeholder="What is this article about?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control fomr-control-lg"
                    placeholder="Enter Tags"
                    value={tagList}
                    onChange={(e) => setTagList(e.target.value.split(','))}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <button
                    type="submit"
                    className="btn btn-lg pull-xs-right btn-primary"
                  >
                    Publish article
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
