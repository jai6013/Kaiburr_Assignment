// src/App.js
import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import BarChart from "./components/BarChart";
import styles from "./styles/app.module.css";
import SearchComponent from "./components/SearchComponent";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${
        (currentPage - 1) * itemsPerPage
      }`
    )
      .then((response) => response.json())
      .then((responseData) => {
        setData(responseData?.products);
        setTotalProducts(responseData?.total);
      });
  }, [currentPage]);

  const handleDataCheck = (selectedRows) => {
    const selectedData = data.filter((row) => selectedRows.includes(row.id));
    setSelectedData(selectedData);
  };

  const handleSearchInputChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return (
    <>
      <h1 className={styles.heading}>Data Visualization App</h1>
      <BarChart data={selectedData} />
      <SearchComponent
        searchTerm={searchTerm}
        onSearchInputChange={handleSearchInputChange}
      />
      <DataTable
        data={data}
        onDataCheck={handleDataCheck}
        totalProducts={totalProducts}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        searchTerm={searchTerm}
        setCurrentPage={setCurrentPage}
      />
    </>
  );
};

export default App;
