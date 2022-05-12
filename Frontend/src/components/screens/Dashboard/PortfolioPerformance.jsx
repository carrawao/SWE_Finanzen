import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, registerables,} from 'chart.js';
import {format, addDays, subDays, differenceInDays} from 'date-fns';
import 'chartjs-adapter-date-fns';
import {Card, CardHeader, CardContent, Checkbox, FormGroup, FormControlLabel} from '@mui/material';
import PropTypes from 'prop-types';

function changeData(view, data, labels, options, setup) {
  if (labels[0]) {
    let lastDate = new Date(labels[0]);
    //Timespan in days default = from first to last datapoints date
    let timespan = differenceInDays(lastDate, new Date(labels[labels.length - 1]));

    switch (view) {
      case 'week':
        timespan = 7;
        options.scales.x.time.unit = 'day';
        break;
      case 'month':
        timespan = 30;
        options.scales.x.time.unit = 'day';
        break;
      case '6month':
        timespan = 180;
        options.scales.x.time.unit = 'month';
        break;
      case 'year':
        timespan = 365;
        options.scales.x.time.unit = 'month';
        break;
      case 'all':
      default:
        options.scales.x.time.unit = 'month';
    }
    // Not all dates have data entries so we are
    // searching for starting Date by shrinking the timespan day by day
    // till we find datapoint for date
    let startDate = subDays(lastDate, timespan);
    let startDateIndex = -1;
    do {
      let startDateString = format(startDate, 'yyyy-MM-dd');
      startDateIndex = labels.indexOf(startDateString);
      startDate = addDays(startDate, 1);
    } while (startDateIndex === -1);

    // slicing out original data accordingly and replacing ONLY the graph data
    setup.datasets[0].data = data.slice(0, startDateIndex + 1);
    setup.labels = labels.slice(0, startDateIndex + 1);
  }
}

export const PortfolioPerformance = props => {
  ChartJS.register(...registerables);

  const dailyPerfData = props.portfolioData[props.activePortfolio].dailyDataForPerformanceGraph ? props.portfolioData[props.activePortfolio].dailyDataForPerformanceGraph : {};
  const labels = Object.keys(dailyPerfData);
  let perfData = Object.values(dailyPerfData).map(data => data.performanceWithRealisedGains);
  const [realised, setRealised] = useState(true);
  // If user want unrealised data
  if (!realised) {
    perfData = Object.values(dailyPerfData).map(data => data.performanceWithoutRealisedGains);
  }
  const setup = {
    labels: labels,
    datasets: [{
      label: 'Performance',
      data: perfData,
      borderColor: 'rgb(153, 102, 51)',
      backgroundColor: 'rgb(153, 102, 51)',
      pointRadius: 0
    }]
  }
  const options = {
    //maintainAspectRatio: false,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            month: 'MMM',
            day: 'dd'
          }
        },
        grid: {
          display: false
        }
      },
      y: {
        beginAtZero: true,
        position: 'left',
        grid: {
          drawOnChartArea: true
        },
        ticks: {
          callback: function (value) {
            return value.toFixed(2) + '%';
          }
        }
      }
    },
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label;
            let value = context.dataset.data[context.dataIndex];
            label += ': ' + value.toFixed(2) + '%';
            return label;
          },
          title: function (context) {
            let title = context[0].label.split(',');
            title = title[0] + title[1];
            return title;
          },
        }
      },
      legend: {
        display: false
      }
    }
  }
  changeData(props.view, perfData, labels, options, setup)
  return (
    <Card className='col-xl-12' raised sx={{border: 3, borderColor: 'rgb(228 126 37)', borderRadius: 3}}>
      <CardHeader
        title='Performance'
        action={
        <FormGroup className='d-none d-sm-block'>
          <FormControlLabel
            control={<Checkbox checked={realised} onChange={e => {
            setRealised(!realised)
          }}/>}
            label='Realised Performance'
          />
        </FormGroup>
      }/>
      <CardContent>
        <Line data={setup} options={options}/>
      </CardContent>
    </Card>
  )

}

export default PortfolioPerformance;