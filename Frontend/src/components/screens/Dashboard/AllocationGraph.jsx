import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography, Grid, Paper } from '@mui/material';
import { DoughnutChart } from '../../common';

/**
 * Shows the allocation of the portfolio
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const AllocationGraph = (props) => {

  const defaultMiddleDisplayLabel = "Total Value";
  const defaultMiddleDisplayValue = props.portfolioData.value;
  
  const [middleDisplayLabel, setMiddleDisplayLabel] = useState(defaultMiddleDisplayLabel);
  const [middleDisplayValue, setMiddleDisplayValue] = useState(defaultMiddleDisplayValue);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const setDefaultValues = () => {
    setMiddleDisplayLabel(defaultMiddleDisplayLabel);
    setMiddleDisplayValue(defaultMiddleDisplayValue);
  }
  
  const assets = props.getAllAssets();
  
  const labels = (() => {
    let labels = []
    assets.forEach(element => {
      labels.push(element["name"]);
    });
    return labels;
  })();

  const valueData = (() => {
    let valueData = []
    assets.forEach(element => {
      valueData.push(element["value"]*element["quantity"]);
    });
    return valueData;
  })();

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'value',
        data: valueData,
        color: [
          'rgba(59, 151, 210, 1)',
          'rgba(241, 155, 31, 1)',
          'rgba(229, 126, 37, 1)',
          'rgba(239, 195, 25, 1)',
          'rgba(78, 185, 111, 1)',
        ],
        backgroundColor: [
          'rgba(59, 151, 210, 1)',
          'rgba(241, 155, 31, 1)',
          'rgba(229, 126, 37, 1)',
          'rgba(239, 195, 25, 1)',
          'rgba(78, 185, 111, 1)',
        ],
        borderColor: [
          'rgba(59, 151, 210, 1)',
          'rgba(241, 155, 31, 1)',
          'rgba(229, 126, 37, 1)',
          'rgba(239, 195, 25, 1)',
          'rgba(78, 185, 111, 1)',
        ],
        borderWidth: 1,
        spacing: 0
      },
    ],
  };
  
  return (
    <DoughnutChart
      data= {valueData}
      labels = {labels}
      defaultMiddleDisplayValue = {defaultMiddleDisplayValue}
      defaultMiddleDisplayLabel = {defaultMiddleDisplayLabel}
    ></DoughnutChart>
  );        
}

AllocationGraph.propTypes = {
  portfolioData: PropTypes.object,
  getAllAssets: PropTypes.func,
};

export default AllocationGraph;
