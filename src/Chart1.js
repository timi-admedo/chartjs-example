import React from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2'
import './Chart1.css';

const Chart1 = ({ data, type }) => {
    const noData = (<div>NO DATA AVAILABLE</div>)


    const lineChart = (
        data[0] ? (
            <Line
                data={{
                    labels: data.map(({ time }) => time),
                    datasets: [{
                        data: data.map((data) => data.temperature),
                        label: 'Temperature',
                        borderColor: '#3333ff',
                        fill: true,
                    }, {
                        data: data.map((data) => data.cloudCover),
                        label: 'Cloud Cover',
                        borderColor: '#607c85',
                        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }, {
                        data: data.map((data) => data.windSpeed),
                        label: 'Wind Speed',
                        borderColor: '#8db6c2',
                        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }, {
                        data: data.map((data) => data.windGust),
                        label: 'Wind Gust',
                        borderColor: '#dd5182',
                        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    }, {
                        data: data.map((data) => data.windBearing),
                        label: 'Wind Bearing',
                        borderColor: '#955196',
                        // backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                    },
                    ]
                }}
            />
        ) : noData
    );

    const barChart = (
        data[0] ? (
            <Bar
                data={{
                    labels: data.map(({ time }) => time),
                    datasets: [
                        {
                            label: 'Temperature',
                            backgroundColor: ['rgba(0, 0, 255, 0.5)', 'rgba(0, 255, 100, 0.5)', 'rgba(255, 0, 110, 0.5)'],
                            data: data.map((data) => data.temperature),
                        },
                    ],
                }}
                options={{
                    legend: { display: false },
                }}
            />
        ) : noData
    );

    const scatterChart = (
        data[0] ? (
            <Scatter
                data={{
                    label: 'Scatter Graph',
                    datasets: [{
                        data: formatScatter(data),
                        label: 'Temperature',
                        borderColor: '#8db1c2',
                        fill: true,
                    }],
                    options: {
                        showLines: false
                    }
                }}
            />
        ) : noData
    )

    function formatScatter(data) {
        let z = 0;
        const result = data.map(point => ({ x: z++, y: point.temperature }))
        return result
    }


    let inj = { data, type }
    switch (inj.type) {
        case 'line':
            return (<div> {lineChart}</div>)
        case 'bar':
            return (<div> {barChart}</div>)
        case 'scat':
            return (<div> {scatterChart}</div>)
        default:
            return null;
    }
}

export default Chart1;
