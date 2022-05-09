import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {Typography, Grid, Paper} from '@mui/material';

/**
 * Shows a Custom DoughnutChart
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const DoughnutChart = props => {
  const defaultMiddleDisplayLabel = props.defaultMiddleDisplayLabel;
  const defaultMiddleDisplayValue = props.defaultMiddleDisplayValue;

  const [middleDisplayLabel, setMiddleDisplayLabel] = useState(defaultMiddleDisplayLabel);
  const [middleDisplayValue, setMiddleDisplayValue] = useState(defaultMiddleDisplayValue);

  ChartJS.register(ArcElement, Tooltip, Legend);

  const setDefaultValues = () => {
    setMiddleDisplayLabel(defaultMiddleDisplayLabel);
    setMiddleDisplayValue(defaultMiddleDisplayValue);
  }

  const labels = props.labels;

  const valueData = props.data;

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
    <Grid
      sx={{
        position: 'relative',
        padding: '1rem'
      }}
    >
      <Grid
        id='doughnutGraph-middleDisplay'
        container
        direction='column'
        justifyContent='center'
        alignItems='center'
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          zIndex: '100'
        }}
      >
        <Paper sx={{marginBottom: '0.5rem'}}>
          <Typography>{middleDisplayLabel}</Typography>
        </Paper>
        <Typography>{middleDisplayValue}</Typography>
      </Grid>
      <Doughnut
        data={data}
        options={{
          responsive: true,
          cutoutPercentage: 90,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              external: function (context) {
                const tooltipModel = context.tooltip;
                //Set to default values if no tooltip
                if (tooltipModel.opacity === 0) {
                  setDefaultValues();
                  return;
                }

                function getBody(bodyItem) {
                  return bodyItem.lines;
                }

                // Set Text
                if (tooltipModel.body) {
                  const bodyLines = tooltipModel.body.map(getBody);

                  bodyLines.forEach(function (body, i) {
                    const bodyparts = body[0].split(':');
                    setMiddleDisplayLabel(bodyparts[0]);
                    setMiddleDisplayValue(`${bodyparts[1].trim()} €`);
                  });
                }
              }
            },
          }
        }}
      />
    </Grid>
  );
}

DoughnutChart.propTypes = {
  defaultMiddleDisplayLabel: PropTypes.string,
  defaultMiddleDisplayValue: PropTypes.string,
  data: PropTypes.array,
  labels: PropTypes.array
};

export default DoughnutChart;
