import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, } from 'chart.js';
import { format, addDays, subDays, differenceInDays } from 'date-fns';
import 'chartjs-adapter-date-fns';
import PropTypes from 'prop-types';

ChartJS.register(...registerables);
function setView(view, data, labels, options, setup) {
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

export const AssetPerformance = (props) => {
    
    const investment = props.activity.value;
    const startDate = props.activity.firstActivity;
    // Slicing relevant data for only dates after activity
    const sliceIndex = props.labels.indexOf(startDate);
    const perfLabels = props.labels.slice(0,sliceIndex);
    const priceData = props.data.slice(0,sliceIndex);
    const perfData = priceData.map(price => (price/investment-1));

    const setup = {
        labels: perfLabels,
        datasets:[{
            label:'Performance',
            data:perfData,
            borderColor: 'rgb(153, 102, 51)',
			backgroundColor: 'rgb(153, 102, 51)',
			pointRadius: 0
        }]
    }
    const options = {
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
                        return (value * 100).toFixed(2) + '%';
                    }
                }
            }
        },
        plugins: {
            tooltip: {
                enabled: true,
                intersect: false,
                callbacks:{
                    label: function (context) {
                        let label = context.dataset.label;
                        let value = context.dataset.data[context.dataIndex];
                        label += ': ' + (value * 100).toFixed(2) + '%' 
                        return label;
                    },
                    title: function (context) {
                        let title = context[0].label.split(',');
                        title = title[0] + title[1];
                        return title;
                    }
                }
            },
            legend: {
                display: false
            }
        }
    }
    //setView(props.view, perfData, perfLabels, options, setup);
    return <Line data={setup} options={options} />
}
AssetPerformance.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    labels: PropTypes.arrayOf(PropTypes.string),
    activity: PropTypes.object
}
export default AssetPerformance;