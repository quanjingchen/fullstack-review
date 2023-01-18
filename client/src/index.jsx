import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

const App = () => {

  const [repos, setRepos] = useState([]);
  const url = '';

  const getAll = () => {
    console.log(`get top 25 repos`);
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: 'GET',
      contentType: 'application/json',
      success: data => setRepos([...data]),
      error: err => console.log(err)
    })
  };

  const search = (term, callback) => {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://127.0.0.1:1128/repos',
      type: 'POST',
      data: JSON.stringify({username: term}),
      contentType: 'application/json',
      success: () => { callback(null); getAll() },
      error: (err) => callback(err)
    })
  };

  useEffect(getAll, []);

  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));