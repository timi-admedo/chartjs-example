
import React from 'react'
import Chart2 from './Chart2';
import { rangeFilter2, fetchCsv2, subSetFilter } from './Services'
import './Chart1.css';
import Info from './Info';

class ChartWrapper extends React.Component {
    state = {
        data: {},
        sensor: 1,
        range: '30',
        filter: '',
        type: 'line'
    }

    async componentDidMount() {
        const data = await fetchCsv2(this.state.sensor);
        const filteredData = rangeFilter2(data, this.state.range);
        this.setState({ data: filteredData });
    }

    handleRangeChange = async (e) => {
        e.preventDefault();
        const range = e.target.value;
        const data = await fetchCsv2(this.state.sensor);
        const filteredData = rangeFilter2(data, range);
        const subset = subSetFilter(filteredData, this.state.filter);
        this.setState({ range: range });
        this.setState({ data: subset });
    }

    handleSensorChnage = async (e) => {
        e.preventDefault();
        const sensor = e.target.value;
        const data = await fetchCsv2(sensor);
        const filteredData = rangeFilter2(data, this.state.range);
        const subset = subSetFilter(filteredData, this.state.filter);
        this.setState({ sensor: sensor });
        this.setState({ data: subset });
    }

    handleSetChange = async (e) => {
        e.preventDefault();
        const filter = e.target.value;
        const data = await fetchCsv2(this.state.sensor);
        const filteredData = rangeFilter2(data, this.state.range);
        const subset = subSetFilter(filteredData, filter);
        this.setState({ filter: filter });
        this.setState({ data: subset });
    }
    changeGraph(e) {
        e.preventDefault();
        this.setState({ type: e.target.value });
    }



    render() {
        const { data, type } = this.state;
        return (
            <div>
                <div className="chart-wrapper">
                    <Info data={data} />
                    <h3> Sensor Data </h3>
                    <Chart2 data={data}
                        type={type} />
                    <select defaultValue="30" onChange={(e) => this.handleRangeChange(e)}>
                        <option value="7">1 Week</option>
                        <option value="30">30 Days</option>
                        <option value="90">90 Days</option>
                        <option value="365">1 Year</option>
                        <option value="">All Data</option>
                    </select>
                    <select defaultValue="1" onChange={(e) => this.handleSensorChnage(e)}>
                        <option value="1">Sensor 1</option>
                        <option value="2">Sensor 2</option>
                    </select>
                    <select defaultValue="" onChange={(e) => this.handleSetChange(e)}>
                        <option value="">All Tilts</option>
                        <option value="x_tilt">X Tilt</option>
                        <option value="y_tilt">Y Tilt</option>
                        <option value="z_tilt">Z Tilt</option>
                    </select>
                    <select defaultValue="" onChange={(e) => this.changeGraph(e)}>
                        <option value="line">Line Graph</option>
                        <option value="bar">Bar Graph</option>
                        <option value="scat">Scatter Plot</option>
                    </select>
                </div>
            </div>
        )
    }
}

export default ChartWrapper;
