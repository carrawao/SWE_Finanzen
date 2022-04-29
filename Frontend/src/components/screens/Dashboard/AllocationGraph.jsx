import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material';

/**
 * Shows the allocation of the portfolio
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const AllocationGraph = (props) => {
  
  const [middleDisplay, setMiddleDisplay] = useState(props.portfolioData["value"]);
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
        spacing: 0
      },
    ],
  };
  
  return (
    <React.Fragment sx={{position: 'relative'}}>
    <Doughnut 
            data={data} 
            options={{
              responsive: true,
              cutoutPercentage: 90,
              plugins: {
                legend: {
                  display: false,
                },
              }
            }}
          />
          
    <Typography 
      id="allocationGraph-middleDisplay" 
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
    >
      Hi
    </Typography>
    </React.Fragment>
  );        
}

AllocationGraph.propTypes = {
  portfolioData: PropTypes.object,
  getAllAssets: PropTypes.func,
};

export default AllocationGraph;
