import React,{ useEffect, useState} from "react";
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables,} from 'chart.js';
import {format, addDays, subDays, differenceInDays} from 'date-fns';
import "chartjs-adapter-date-fns";
import { CircularProgress, Container } from "@mui/material";
import PropTypes from "prop-types"

ChartJS.register(...registerables);

// Crosshair plugin
const crosshair = {
    id: 'crosshair',
    beforeDatasetsDraw(chart, args, options) {
        const { ctx, tooltip, chartArea: { top, bottom, left, right } } = chart
        //Vertical dashed Line
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
function setView(view,data,labels,options,setup){    
    let lastDate = new Date(labels[0]);
    //Timespan in days default = from first to last datapoints date
    let timespan = differenceInDays(lastDate,new Date(labels[labels.length-1]));

    switch(view){
        case 'week':
            timespan = 7;
            options.scales.x.time.unit='day';        
            break;
        case 'month':
            timespan = 30;
            options.scales.x.time.unit='day';
            break;
        case '6month':
            timespan = 180;
            options.scales.x.time.unit='month';        
            break;
        case 'year':
            timespan = 365;
            options.scales.x.time.unit='month';
            break;
        case 'all':
        default: 
            options.scales.x.time.unit='month';
    }
    // Not all dates have data entrys so we are 
    // searching for starting Date by shrinking the timespan day by day
    let startDate = subDays(lastDate, timespan);
    let startDateIndex = -1;
    do{
        let startDateString = format(startDate,"yyyy-MM-dd");
        startDateIndex = labels.indexOf(startDateString);
        startDate = addDays(startDate,1);
    }while(startDateIndex === -1);
    
    // slicing out original data accordingly and replacing ONLY the graph data
    setup.datasets[0].data = data.slice(0,startDateIndex+1);
    setup.labels = labels.slice(0,startDateIndex+1);
}
/**
 * Component to display a stockchart from given 
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const Stockchart = (props) => {  
    const [isLoaded, setLoaded] = useState(false);
    const [labels, setLabels] = useState([]);
    const [data, setData] = useState([]);    
    
    useEffect(() => {
        console.log("fetching stockdata...");
        const base = "http://localhost:3001";
        let url = new URL(`dailyShare?symbol=${props.symbol}`, base);
        if(props.assetType === "Crypto"){
            url = new URL(`dailyCrypto?symbol=${props.symbol}`, base);
        }
        fetch(url.toString())
        .then(res => res.json())
        .then(json => {
            let labels;
            let data;
            // Chooses how to format different json according to assetType
            switch(props.assetType){
                case "Crypto":
                    labels = Object.keys(json['Time Series (Digital Currency Daily)']);
                    data = Object.values(json['Time Series (Digital Currency Daily)']).map(o => Number(o['4b. close (USD)']));
                    break;
                case "ETF":
                case "Stock":
                default:
                    labels = Object.keys(json['Time Series (Daily)']);
                    data = Object.values(json['Time Series (Daily)']).map(o => Number(o['4. close']));
                    break;

            }
            setLabels(labels);
            setData(data);
            setLoaded(true);
            props.setStockPrice(data[0]);
            console.log("Sharedata loaded!");
          }
        );
    
      }, []);

    const setup = {
        labels:labels,
        datasets:[{
            label:props.symbol,
            data:data,
            borderColor: 'rgba(0,0,255,0.6)',
            backgroundColor: 'rgba(0,0,255,0.6)',
            yAxisId: 'stockpriceAxis',
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
            stockpriceAxis: {
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
                        label += ": " + new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', })
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
    
    if(isLoaded){

        setView(props.view,data,labels,options,setup);
        props.setPerf(1 - (setup.datasets[0].data[setup.datasets[0].data.length-1] / setup.datasets[0].data[0]));
        return <Container maxWidth='md'><div><Line data={setup} options={options} plugins={[crosshair]}/></div></Container>
    }
    return <CircularProgress/>
};
Stockchart.propTypes = {
    symbol: PropTypes.string,
    setStockPrice: PropTypes.func,
    view: PropTypes.string,
    setPerf: PropTypes.func,    
  };

export default Stockchart;