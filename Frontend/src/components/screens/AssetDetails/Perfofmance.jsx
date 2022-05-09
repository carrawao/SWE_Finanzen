import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, } from 'chart.js';
import 'chartjs-adapter-date-fns';
import PropTypes from 'prop-types';

ChartJS.register(...registerables);

export const Performance = (props) => {
    // Still some indecisiveness how or what should be displayed
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

    return <Line data={setup} options={options} />
}
Performance.propTypes = {
    data: PropTypes.arrayOf(PropTypes.number),
    labels: PropTypes.arrayOf(PropTypes.string),
    activity: PropTypes.object
}
export default Performance;