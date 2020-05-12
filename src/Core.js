
import React from 'react'
import './Chart1.css';
import ChartWrapper from './SonarChart';
import ChartWrapper2 from './WeatherChart';

class App extends React.Component {


    render() {
        return (
            <div className="App">
                <ChartWrapper2 />
                <ChartWrapper />
            </div>
        )
    }
}

export default App;
