import React from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

/**
 * Shows the allocation of the portfolio
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const AllocationGraph = (props) => {
  
  ChartJS.register(ArcElement, Tooltip, Legend);
  
  const data = {
    labels: ['Allianz', 'MSCI World', 'MSCI Emerging Markets'],
    datasets: [
      {
        label: '# of Votes',
        data: [1202.72, 19223.21, 302.12],
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
      },
    ],
  };
  
  return <Doughnut data={data} />;
}

AllocationGraph.propTypes = {
  activePortfolio: PropTypes.string,
  portfolioData: PropTypes.object,
};

export default AllocationGraph;
