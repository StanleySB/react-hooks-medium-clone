import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import ErrorMessage from './errorMessage';
import Loading from './loading';

const PopularTags = () => {
	const [ { isLoading, response, error }, doFetch ] = useFetch('/tags');
	useEffect(
		() => {
			doFetch();
		},
		[ doFetch ]
	);

	if (isLoading || !response) {
		return <Loading />;
	}

	if (error) {
		return <ErrorMessage />;
	}

	return (
		<div className="sidebar">
			<p>Popular Tags</p>
			<div className="tag-list">
				{response.tags.map((tag) => (
					<Link to={`/tags/${tag}`} className="tag-default tag-pill" key={tag}>
						{tag}
					</Link>
				))}
			</div>
		</div>
	);
};

export default PopularTags;
