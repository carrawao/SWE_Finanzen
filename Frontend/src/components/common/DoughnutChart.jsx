import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    setDefaultValues();
  }, [defaultMiddleDisplayLabel]);

  const setDefaultValues = () => {
    setMiddleDisplayLabel(defaultMiddleDisplayLabel);
    setMiddleDisplayValue(defaultMiddleDisplayValue);
  }

  const labels = props.labels;

  const valueData = props.data;
  const colorOffset = 50;
  const colors = labels.map((_, index) => {
    const hue = colorOffset + index * 137.503; // rotates for distinguishable colors
    return `hsl(${hue},60%,60%)`;
    }
  );

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'value',
        data: valueData,
        color: colors,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        spacing: 0
      },
    ],
  };

  return (
    <Grid 
      container
      justifyContent="center"
      sx={{
        position: 'relative',
        padding: '1rem'
      }}
    >
      <Grid 
        container
        id="doughnutGraph-middleDisplay" 
        direction="column"
        justifyContent="center"
        alignItems="center"
        maxWidth="50%"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          zIndex: '100'
        }}
      >
        <Paper sx={{margin: '0.25rem', zIndex: '100'}}>
          <Typography sx={{textAlign: "center"}}>{middleDisplayLabel}</Typography>
        </Paper>
        <Paper elevation={0} sx={{margin: '0.25rem', zIndex: '100'}}>
          <Typography sx={{textAlign: "center"}}>{middleDisplayValue}</Typography>
        </Paper>
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
              external: function(context) {
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
                  
                  bodyLines.forEach(function(body, i) {
                    const bodyparts = body[0].split(":");
                    setMiddleDisplayLabel(bodyparts[0]);
                    setMiddleDisplayValue(`${bodyparts[1].trim()} ${props.analysis ? '%' : '€'}`);
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
  analysis: PropTypes.bool,
  defaultMiddleDisplayLabel: PropTypes.string,
  defaultMiddleDisplayValue: PropTypes.string,
  data: PropTypes.array,
  labels: PropTypes.array
};

export default DoughnutChart;
