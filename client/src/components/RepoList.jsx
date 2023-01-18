import React from 'react';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo, index) => {

      return (<div key={index}>
        <a href={repo.html_url}>{repo.name}</a>
        <p>{repo.owner_name}</p>
        <p>{repo.description}</p>
        <p>{repo.private ? 'Private' : 'Public'}</p>
        <p>stars: {repo.stargazers_count}</p>
        <p>updated at: {repo.updated_at}</p>
      </div>)

    })}
  </div>
)

export default RepoList;