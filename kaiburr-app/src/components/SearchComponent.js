// src/components/SearchComponent.js
import React from 'react';
import styles from '../styles/searchBar.module.css';

const SearchComponent = ({ searchTerm, onSearchInputChange }) => {
  return (
    <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => onSearchInputChange(e.target.value)}
        className={styles.searchInput}
      />
  );
};

export default SearchComponent;
