import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS, registerables,} from 'chart.js';
import {format, addDays, subDays, differenceInDays} from 'date-fns';
import 'chartjs-adapter-date-fns';
import {CircularProgress, Card, CardContent, CardHeader} from '@mui/material';
import PropTypes from 'prop-types';

// Crosshair plugin
//Draws a vertical dashed line on data element 
const crosshair = {
  id: 'crosshair',
  beforeDatasetsDraw(chart, args, options) {
    const {ctx, tooltip, chartArea: {top, bottom, left, right}} = chart
    if (tooltip && tooltip._active[0]) {
      ctx.save();
      ctx.beginPath();
      ctx.setLineDash([5, 10]);
      ctx.moveTo(tooltip._active[0].element.x, top);
      ctx.lineTo(tooltip._active[0].element.x, bottom);
      ctx.lineWidth = options.width;
      ctx.strokeStyle = options.color;
      ctx.stroke();
      ctx.restore();
    }
  }
}

// Manipulates chart data to only show from views timespan / range
function changeData(view, data, labels, options, setup) {
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
  // Not all dates have data entrys so we are
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

/**
 * Component to display a pricechart via Type and Symbol of Asset
 * @param string symbol
 * @param string assetType
 * @returns {JSX.Element}
 */
export const AssetChart = props => {
  ChartJS.register(...registerables);

  const [price, setPrice] = useState(0);
  //To check if data is still fetching
  const [isLoading, setIsLoading] = useState(true);
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);
  //Fetch Asset only once
  useEffect(() => {
    console.log(`Fetching asset ${props.symbol}...`);
    const base = process.env.REACT_APP_BASEURL;
    //fetch according to the type of asset
    let url = new URL(`dailyShare?symbol=${encodeURIComponent(props.symbol)}`, base);
    if (props.assetType === 'crypto') {
      url = new URL(`dailyCrypto?symbol=${encodeURIComponent(props.symbol)}`, base);
    }
    fetch(url.toString())
      .then(res => res.json())
      .then(json => {
          let labels;
          let data;
          // Chooses how to format different json according to type of asset
          if (props.assetType === 'crypto') {
            labels = Object.keys(json['Time Series (Digital Currency Daily)']);
            data = Object.values(json['Time Series (Digital Currency Daily)']).map(o => Number(o['4a. close (EUR)']));
            props.setName(json['Meta Data']['3. Digital Currency Name']);
          } else {
            labels = Object.keys(json['Time Series (Daily)']);
            data = Object.values(json['Time Series (Daily)']).map(o => Number(o['4. close']));
          }
          setLabels(labels);
          setData(data);
          setIsLoading(false);
          setPrice(data[0]); //First data is latest price
          console.log('Asset fetched!');
        }
      );
  }, []);
  // chart data
  const setup = {
    labels: labels,
    datasets: [{
      label: props.symbol,
      data: data,
      borderColor: 'rgb(59 151 210)', // light blue
      backgroundColor: 'rgb(78 185 111)',// light green
      yAxisId: 'stockpriceAxis',
      pointRadius: 0
    }]
  }
  // chart options
  const options = {
    maintainAspectRatio: true,
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
      stockpriceAxis: {
        position: 'left',
        grid: {
          drawOnChartArea: true
        },
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR',}).format(value);
          }
        }
      }
    },
    // Lots of custom plugins refer to chartjs doc
    plugins: {
      tooltip: {
        enabled: true,
        intersect: false,
        callbacks: {
          label: function (context) {
            let label = context.dataset.label;
            label += ': ' + new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR',})
              .format(context.dataset.data[context.dataIndex]);
            return label;
          },
          title: function (context) {
            let title = context[0].label.split(',');
            title = title[0] + title[1];
            return title;
          },
          labelTextColor: function (context) {
            let color = 'red';
            if (context.dataset.data[context.dataIndex] > context.dataset.data[context.dataIndex + 1]) {
              color = 'green';
            }
            return color;
          }
        }
      },
      legend: {
        display: false
      },
      crosshair: {
        color: 'grey',
        width: 2
      }
    }
  }

  if (isLoading) {
    return <CircularProgress/>
  }

  // Manipulate data according to view
  changeData(props.view, data, labels, options, setup);
  return (
    <Card className='col-xl-12' raised sx={{border: 3, borderColor: 'rgb(228 126 37)', borderRadius: 3}}>
      <CardHeader
        title={'Price | ' + props.name}
        subheader={Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR',}).format(price)}/>
      <CardContent>
        <Line data={setup} options={options} plugins={[crosshair]}/>
      </CardContent>
    </Card>
  )
};

AssetChart.propTypes = {
  symbol: PropTypes.string,
  view: PropTypes.string,
  setPerf: PropTypes.func,
};

export default AssetChart;