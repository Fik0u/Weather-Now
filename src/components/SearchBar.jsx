import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './styles/SearchBar.css';

const SearchBar = ({ onSearch }) => {

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim() !== '') {
        onSearch(input.trim());
      }
    };

  return (
    <form onSubmit = {handleSubmit}>
      <div className='search-wrapper'>
        <input
          type='text'
          placeholder='Enter city name'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className='search-input'
        />
        <button type='submit' className='search-icon-btn' >
          <FiSearch />
        </button>
      </div>
    </form>

  )
}

export default SearchBar
