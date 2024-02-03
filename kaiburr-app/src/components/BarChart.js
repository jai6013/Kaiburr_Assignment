import React from 'react';
import Plot from 'react-plotly.js';
import styles from '../styles/barChart.module.css';

const BarChart = ({ data }) => {
  const chartData = {
    x: data.map((row) => row.title),
    y: data.map((row) => row.price),
    type: 'bar',
  };

  return <Plot data={[chartData]} layout={{ width: window.screen.width, height: "inherit" }} />;
};

export default BarChart;
