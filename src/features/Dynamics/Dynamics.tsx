import React, { FC, useState } from 'react';
import { Card, Tabs, Tab, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Chart } from './Chart';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
  },
}));

export const Dynamics: FC = () => {
  const { card } = useStyles();
  const [selectedTab, setSelectedTab] = useState('week');

  return (
    <Card className={card} elevation={3}>
      <CardContent>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Last year" value="year" />
          <Tab label="Last month" value="month" />
          <Tab label="Last week" value="week" />
        </Tabs>
        <Chart selectedTab={selectedTab} />
      </CardContent>
    </Card>
  );
};
