import React from 'react';

import '../styles/Components/SearchBar.scss';

const SearchTag = ({searchterm, removeSearchTerm}) => {

  const removeTagHandler = () => {
    removeSearchTerm(searchterm)
  }

  return (
    <li className="searchTag">
      <button onClick={removeTagHandler}>
        <i className="fas fa-hashtag"></i>
        <p>{searchterm}</p> 
      </button>
    </li>
  )
}

export default SearchTag
