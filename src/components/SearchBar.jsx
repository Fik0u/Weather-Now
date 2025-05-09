import React, { useState } from 'react'

const SearchBar = ({ onSearch }) => {

    const [input, setInput] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      if (input.trim() !== '') {
        onSearch(input.trim());
        setInput('');
      }
    };

  return (
    <form onSubmit = {handleSubmit}>
      <input
        type='text'
        placeholder='Enter city name'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button type='submit'>Search</button>
    </form>
  )
}

export default SearchBar
