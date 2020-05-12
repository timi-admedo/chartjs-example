import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import cx from 'classnames';
import styles from './Cards.css';
import { fetchCsv2, getAlerts } from './Services';

const Info = () => {
  const [amberList, setAmberList] = useState([]);
  const [redList, setRedList] = useState([]);
  useEffect(() => {
    async function fetchAlerts() {
      const set1 = await fetchCsv2(1);
      const set2 = await fetchCsv2(2);
      const obj = await getAlerts(set1, set2);
      setHtml(obj);
    }
    fetchAlerts();
  }, []);

  function setHtml(data) {
    setAmberList(data.amberAlert);
    setRedList(data.redAlert);
  }
  const amberAlertList = amberList.map((msg, i) => (
    <p key={i}>
      {msg.sensor_model} at {msg.datetime}
    </p>
  ));
  const redAlertList = redList.map((msg, i) => (
    <p key={i}>
      {msg.sensor_model} at {msg.datetime}
    </p>
  ));

  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid
          item
          xs={12}
          md={3}
          component={Card}
          className={cx(styles.card, styles.infected)}
        >
          <CardContent>
            <Typography>
              Current Time and Date: {new Date().toDateString()}
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          component={Card}
          className={cx(styles.card, styles.recovered)}
        >
          <CardContent>
            <Typography component={'span'} color="textSecondary" gutterBottom>
              Amber Alert readings in this set: {amberAlertList}
            </Typography>
          </CardContent>
        </Grid>

        <Grid
          item
          xs={12}
          md={3}
          component={Card}
          className={cx(styles.card, styles.deaths)}
        >
          <CardContent>
            <Typography component={'span'} color="textSecondary" gutterBottom>
              Red Alert Readings on this set: {redAlertList}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
};
export default Info;
