import React, { FC, useState } from 'react';
import { Card, Tabs, Tab, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { format, subMonths } from 'date-fns';
import { Chart } from './Chart';

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
  },
}));

type Props = {
  from: string;
  to: string;
};

export const Dynamics: FC<Props> = ({ from, to }) => {
  const { card } = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  const today = new Date();

  const endAt = format(today, 'yyyy-MM-dd');
  const startAt = format(subMonths(today, 1), 'yyyy-MM-dd');

  return (
    <Card className={card} elevation={3}>
      <CardContent>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label="Last 3 years" value={0} />
          <Tab label="Last year" value={1} />
          <Tab label="Last month" value={2} />
          <Tab label="Last week" value={3} />
        </Tabs>
        <Chart from={from} to={to} startAt={startAt} endAt={endAt} />
      </CardContent>
    </Card>
  );
};
