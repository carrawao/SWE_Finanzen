import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Typography, Grid, Paper } from '@mui/material';

/**
 * Shows a Custom DoughnutChart
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */

const DoughnutChart = (props) => {

  const defaultMiddleDisplayLabel = props.defaultMiddleDisplayLabel;
  const defaultMiddleDisplayValue = props.defaultMiddleDisplayValue;
  
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
    <Grid 
      sx={{
        position: 'relative',
        padding: '1rem'
      }}
    >
      <Grid 
        id="doughnutGraph-middleDisplay" 
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
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

AllocationGraph.propTypes = {
  defaultMiddleDisplayValue: PropTypes.string,
  defaultMiddleDisplayValue: PropTypes.string,
  data: PropTypes.string,
  labels: PropTypes.string 
};

export default AllocationGraph;
