import React, { useState } from 'react';

const Search = ({ onSearch }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
  }


  const search = (e) => {
    e.preventDefault();
    onSearch(term, (err) => {
      if (err) {
        console.log('ERROR WITH POSTING DATA: ', err);
      } else {
        console.log('SUCCESSFULLY POSTING DATA')
      }
    });
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={term} onChange={onChange}/>
      <button onClick={search}> Add Repos </button>
    </div>
  );
}

export default Search;