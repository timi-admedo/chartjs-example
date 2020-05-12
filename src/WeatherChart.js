
import React from 'react'
import Chart1 from './Chart1';
import { rangeFilter, fetchCsv } from './Services'
import './Chart1.css';

class ChartWrapper2 extends React.Component {
  state = {
    data: {},
    range: '',
    type: 'line'
  }

  async componentDidMount() {
    const data = await fetchCsv();
    const filteredData = rangeFilter(data, 30);
    this.setState({ data: filteredData });
  }

  handleRangeChange = async (range) => {
    const data = await fetchCsv();
    const filteredData = rangeFilter(data, range);
    this.setState({ data: filteredData });
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
          <h3> Weather Data </h3>
          <Chart1 data={data} type={type} />
          <select defaultValue="30" onChange={(e) => this.handleRangeChange(e.target.value)}>
            <option value="7">1 Week</option>
            <option value="30">30 Days</option>
            <option value="90">90 Days</option>
            <option value="365">1 Year</option>
            <option value="">All Data</option>
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

export default ChartWrapper2;
