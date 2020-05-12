import React from 'react'
import { Line, Bar, Scatter } from 'react-chartjs-2'


const Chart2 = ({ data, type }) => {

    const noData = (<div>NO DATA AVAILABLE</div>)

    const lineChart = (
        data[0] ? (
            <Line
                data={{
                    labels: data.map((data) => data.datetime),
                    datasets: [{
                        data: data.map((data) => data.value),
                        label: 'Value',
                        borderColor: '#8db6c2',
                        fill: true,
                    }
                    ]
                }}
            />
        ) : noData
    );

    const barChart = (
        data[0] ? (
            <Bar
                data={{
                    labels: data.map((data) => data.datetime),
                    datasets: [
                        {
                            data: data.map((data) => data.value),
                            label: 'Value',
                            backgroundColor: '#8db6c2',
                        },
                        {
                            data: data.map((data) => data.ob_temp),
                            label: 'OB Temp',
                            backgroundColor: '#dd5182',
                        },
                    ],
                }}
            />
        ) : noData
    );

    function formatScatter(data) {
        let z = 0;
        const result = data.map(point => ({ x: z++, y: point.value }))

        return result
    }

    const scatterChart = (
        data[0] ? (
            <Scatter
                data={{
                    label: 'Scatter Graph',
                    datasets: [{
                        data: formatScatter(data),
                        label: 'Value',
                        borderColor: '#8db6c2',
                        fill: true,
                    }],
                    options: {
                        showLines: false
                    }
                }}
            />
        ) : noData
    )

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


export default Chart2;
