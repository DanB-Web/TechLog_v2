import React, { useState } from 'react';

import SearchTag from './SearchTag';

import '../styles/Components/SearchBar.scss';

const SearchBar = ({ searchTerms, addSearchTerm, removeSearchTerm }) => {

  const [searchTerm, setSearchTerm] = useState('');

  const addSearchTermHandler = (e) => {
    e.preventDefault();
    if (searchTerm === '') return;
    addSearchTerm(searchTerm);
    document.querySelector('.search-term-form').reset();
  } 
  
  return (
    <div className="searchbar-container" style={{animation: 'fadeIn 1s forwards'}}>
    {searchTerms.length === 0 && <p className="searchbar-no-terms">No search terms added yet...</p>}
    <ul>{searchTerms.map((searchterm, index) => 
        <SearchTag 
          key={index} 
          searchterm={searchterm} 
          removeSearchTerm={removeSearchTerm}
        />)}
      </ul>
      <form className="search-term-form" onSubmit={addSearchTermHandler}>
        <i className="fas fa-hashtag"></i>
        <input type="text" placeholder="Please enter a search term..." onChange={(e)=> setSearchTerm(e.target.value)}></input>
        <button type="submit">Search</button>
      </form>
    </div>
  )
}

export default SearchBar
