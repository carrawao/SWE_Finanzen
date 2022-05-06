import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables,} from 'chart.js';
import "chartjs-adapter-date-fns"
import {addDays, compareAsc} from "date-fns";
ChartJS.register(...registerables);

function stockDataOf(stockName, day){
    // const stockData = fetch(stockName);
    return stockData['Time Series (Daily)'][day]['4. close']
}

const buyHistory = [
    {date:new Date('2022-03-05'),actions:[{name:'IBM', action:'sell', execprice:210, qty:1},{name:'AAC', action:'buy', execprice:10, qty: 10}]},
    {date: new Date('2022-03-10'),actions:[{name:'AAC', action:'sell', execprice:8, qty:5},{name:'NET', action:'buy', execprice:200, qty: 2}]}
]

// performance = gain / investment
// gain = investment +- current value of investment
// investment = all buys till this day 
// current value of investment = all stocks values of the entry day

function calcPerf(){
    const startDate = buyHistory[0].date;
    const today = new Date();
    const investment = 0;
    const performance = [];
    // Write data from start of history till now
    while(compareAsc(startDate,today) === -1){
        
        investments += 1
        
        //let perf = gains / investments;
        //performance.push(startDate,perf);
        addDays(startDate);
    }
    // investment from first exection till last
    buyHistory.forEach(day => {
        day.actions.forEach(action => {
            if(action === 'buy'){
                investment+=action.price;
            }
            if(action === 'sell'){
                investment-=action.price;
            }
        })
    })



}

const PerfChart = (props) =>{
    performance = []
    // Look how this guy perforemd
    buyHistory.forEach(day => {
        investment = 0;
        startDay = buyHistory[0];
        //ook much he invested on that day
        while(compareAsc(startDay.date,day.date) === -1){
            startDay.actions.forEach(action => {
                if(action === 'buy'){
                    investment += action.price;
                }
                if(action === 'sell'){
                    investment -= action.price;
                }
                gain += investment - stockDataOf(action.name, day);
            })
            performance.push({x:startDay.date, perf: investment - stockDataOf(buy.name, day) / investment})
            addDays(startDay,1);
        }        
    })
    const setup = {
        datasets:[{
            label:'Performance',
            data:performance,
            borderColor: 'rgba(0,0,255,0.6)',
			backgroundColor: 'rgba(0,0,255,0.6)',
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
                callbacks: {
                    label: function (context) {
                        let label = context.dataset.label;
                        label += ": " + (value * 100).toFixed(2) + '%' 
                        return label;
                    },
                    title: function (context) {
                        let title = context[0].label.split(',');
                        title = title[0] + title[1];                        
                        return title;
                    },
                    labelTextColor: function (context) {
                        let color = 'red';
                        if (context.dataset.data[context.dataIndex] > 0) {
                            color = 'green';
                        }
                        return color;
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