import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables, } from 'chart.js';
import { format, addDays, subDays, differenceInDays } from 'date-fns';
import 'chartjs-adapter-date-fns';
import { Card, CardHeader, CardContent } from '@mui/material';
import PropTypes from 'prop-types';

ChartJS.register(...registerables);

function changeData(view, data, labels, options, setup, datasetIndex) {
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
    // must specify which dataset should be cut thats why we have datasetIndex
    setup.datasets[datasetIndex].data = data.slice(0, startDateIndex + 1);
    setup.labels = labels.slice(0, startDateIndex + 1);
}

export const ProtfolioValuechart = (props) => {

    console.log(props.portfolioData.Portfolio.dailyDataForValueDevelopment);
    const dailyValueData = props.portfolioData.Portfolio.dailyDataForValueDevelopment;
    const labels = Object.keys(dailyValueData);
    const valueData = Object.values(dailyValueData).map(data => data.value);
    const investedData = Object.values(dailyValueData).map(data => data.invested);
    const gainData = Object.values(dailyValueData).map(data => data.gains);

    const setup = {
        labels: labels,
        datasets: [{
            label: 'Value',
            data: valueData,
            borderColor: 'rgb(153, 102, 51)',
            backgroundColor: 'rgb(153, 102, 51)',
            pointRadius: 0
        }, {
            label: 'Invested',
            data: investedData,
            borderColor: 'rgb(0, 102, 51)',
            backgroundColor: 'rgb(0, 102, 51)',
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
                //beginAtZero: true,
                position: 'left',
                grid: {
                    drawOnChartArea: true
                },
                ticks: {
                    callback: function (value) {
                        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', }).format(value);
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
                        label += ': ' + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', }).format(value);
                        return label;
                    },
                    title: function (context) {
                        let title = context[0].label.split(',');
                        title = title[0] + title[1];
                        return title;
                    },
                    afterLabel: function (context) {
                        return "Gain: " + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', }).format(gainData[context.dataIndex]);
                    }
                }
            },
            legend: {
                display: false
            }
        }
    }
    changeData(props.view, valueData, labels, options, setup, 0)
    changeData(props.view, investedData, labels, options, setup, 1)
    return (
    <Card raised sx={{ border: 3, borderColor: 'rgb(228 126 37)', borderRadius: 3 }}>
        <CardHeader title="Value"/>        
        <CardContent>
            <Line data={setup} options={options}/>
        </CardContent>
    </Card>
    )

}

export default ProtfolioValuechart;