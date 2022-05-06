import React from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, registerables,} from 'chart.js';
import PropTypes from "prop-types"
ChartJS.register(...registerables);

export const AnalysisPie = () => {
    const example =[
        {
            "assettype": "share", //,crypto oder cash
            "asset": "IBM", //symbol des assets
            "percantage": "32"
        },
        {
            "assettype": "share", //,crypto oder cash
            "asset": "APL", //symbol des assets
            "percantage": "20"
        },
        {
            "assettype": "share", //,crypto oder cash
            "asset": "MSC", //symbol des assets
            "percantage": "15"
        },
        {
            "assettype": "share", //,crypto oder cash
            "asset": "FGD", //symbol des assets
            "percantage": "8"
        }
        ,{
            "assettype": "share", //,crypto oder cash
            "asset": "ERT", //symbol des assets
            "percantage": "4"
        }
        ,{
            "assettype": "share", //,crypto oder cash
            "asset": "SWA", //symbol des assets
            "percantage": "2"
        }
    ]

    const options = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true,                
                callbacks: {
                    label: function (context) {
                        let label = context.label;
                        label += ": " + context.dataset.data[context.dataIndex]+"%"
                        return label;
                    }
                }
            }
        }
    }
    // Percantage btw nice   
    const labels = example.map((share, index) => (share["asset"]));
    const data = example.map((share, index) => (Number(share["percantage"])));
    const colors = example.map((share, index) => {
        const hue = index * 137.503; // rotates for distinguishable colors
        return `hsl(${hue},50%,75%)`;
        }
    );
    console.log(labels);
    console.log(data);
    console.log(colors);
    const setup = {
        labels: labels,        
        datasets:[{
                label: "Assets",
                data: data,
                backgroundColor: colors
        }]
    }

    return <Pie data={setup} options={options}/>
}
export default AnalysisPie;