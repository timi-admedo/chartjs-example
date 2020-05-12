import Papa from 'papaparse';
import moment from 'moment';

export const rangeFilter = (set, range) => {
  let filteredData;
  if (!range) {
    return set;
  }
  const endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const startDate = moment().subtract(range, 'days').format('YYYY-MM-DD');

  filteredData = set.filter((dataSet) => {
    let date = moment(dataSet.time).format('YYYY-MM-DD');
    return date >= startDate && date <= endDate;
  });
  return filteredData;
};

export const rangeFilter2 = (set, range) => {
  if (!range) {
    return set;
  }
  let filteredData;

  const endDate = moment().subtract(1, 'days').format('YYYY-MM-DD');
  const startDate = moment().subtract(range, 'days').format('YYYY-MM-DD');

  filteredData = set.filter((dataSet) => {
    let date = moment(dataSet.datetime).format('YYYY-MM-DD');
    return date >= startDate && date <= endDate;
  });
  return filteredData;
};

export const subSetFilter = (set, subset) => {
  if (!subset) {
    return set;
  }
  let filteredData;
  filteredData = set.filter((dataSet) => {
    return dataSet.sensor_type === subset;
  });
  return filteredData;
};

function relDiff(a, b) {
  if (a === NaN || b === NaN) {
    return;
  }
  return 100 * Math.abs((a - b) / ((a + b) / 2));
}

export const getAlerts = (x, y) => {
  let amberAlert = [];
  let redAlert = [];

  for (var obj in x) {
    if (relDiff(x[obj].value, y[obj].value) > 1) {
      amberAlert.push(x[obj]);
    }
    if (relDiff(x[obj].value, y[obj].value) > 3) {
      redAlert.push(x[obj]);
    }
  }
  return { amberAlert, redAlert };
};

export const fetchCsv = () => {
  return fetch('mock_data/weather_data.csv')
    .then((response) => {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    })
    .then(cleanData);
};

export const fetchCsv2 = (int) => {
  let param = '';
  if (int === 2) {
    param = 'mock_data/sensor_02.csv';
  } else {
    param = 'mock_data/sensor_01.csv';
  }
  return fetch(param)
    .then((response) => {
      let reader = response.body.getReader();
      let decoder = new TextDecoder('utf-8');

      return reader.read().then(function (result) {
        return decoder.decode(result.value);
      });
    })
    .then(cleanData);
};

function cleanData(response) {
  let matrixData = Papa.parse(response);
  let dataTitles = matrixData.data[0];
  const rows = matrixData.data.slice(1);
  const output = rows.map((row) => {
    let obj = {};
    dataTitles.forEach((h, i) => (obj[h] = row[i]));
    return obj;
  });
  return output;
}
