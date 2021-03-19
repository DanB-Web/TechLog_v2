import React, { useState } from 'react';

import SearchTag from './SearchTag';

import '../styles/SearchBar.scss';

const SearchBar = ({ searchTerms, addSearchTerm, removeSearchTerm }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const addSearchTermHandler = (e) => {
    e.preventDefault();
    addSearchTerm(searchTerm);
    document.querySelector('.search-term-form').reset();
  } 
  
  return (
    <div className="searchbar-container" style={{animation: 'fadeIn 1s forwards'}}>
      <form className="search-term-form" onSubmit={addSearchTermHandler}>
        <i className="fas fa-hashtag"></i>
        <input type="text" onChange={(e)=> setSearchTerm(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
      <ul>{searchTerms.map((searchterm, index) => 
        <SearchTag 
          key={index} 
          searchterm={searchterm} 
          removeSearchTerm={removeSearchTerm}
        />)}
      </ul>
    </div>
  )
}

export default SearchBar
