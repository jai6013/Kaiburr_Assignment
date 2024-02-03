// src/components/DataTable.js
import React, { useState, useEffect } from 'react';
import styles from '../styles/dataTable.module.css';

const DataTable = ({ data, onDataCheck, totalProducts, currentPage, itemsPerPage, searchTerm, setCurrentPage }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredData = data.filter((row) =>
    row.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    // Initially, check the first 5 checkboxes
    if (filteredData.length > 0 && selectedRows.length === 0) {
      const initialSelection = filteredData.slice(0, 5).map((row) => row.id);
      setSelectedRows(initialSelection);
      onDataCheck(initialSelection);
    }
  }, [filteredData, selectedRows, onDataCheck]);

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelection = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id];

      onDataCheck(updatedSelection);
      return updatedSelection;
    });
  };

  const handleCheckAll = () => {
    const allIds = filteredData.map((row) => row.id);
    const updatedSelection = selectedRows.length === allIds.length ? [] : allIds;
    setSelectedRows(updatedSelection);
    onDataCheck(updatedSelection);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      {filteredData.length === 0 ? (
        <p>No data available</p>
      ) : (
        <>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedRows.length === filteredData.length}
                    onChange={handleCheckAll}
                  />
                </th>
                <th>Name</th>
                <th>Brand</th>
                <th>Price</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((row) => (
                <tr key={row.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleCheckboxChange(row.id)}
                      style={{ width: '100%' }}
                    />
                  </td>
                  <td>{row.title}</td>
                  <td>{row.brand}</td>
                  <td>{row.price}</td>
                  <td>{row.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>{`${currentPage} / ${Math.ceil(totalProducts / itemsPerPage)}`}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === Math.ceil(totalProducts / itemsPerPage)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
