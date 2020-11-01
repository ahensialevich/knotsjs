import React, { FC, useState } from 'react';
import { Card, Tabs, Tab, CardContent } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
import { Chart } from './Chart';

// Better solution would be a daterange picker (like in antd), but there is no built-in material-ui picker for now. There is not very popular 3-rd party libraries only.
// Material-ui-picker package has several different pickers, but any ranges are available
// the logic in case of rangepicker will be similar to existing one, something like:
// <pseudocode>
// const onChange => (valueFrom, valueTo) => setState(...) and pass to the useQuery hook
// <Daterangepicker onChange{([valueFrom, value2]) => onChange(valueFrom, value2)} />

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(4),
  },
}));

export const Dynamics: FC = () => {
  const { card } = useStyles();
  const [selectedTab, setSelectedTab] = useState('week');
  const { t } = useTranslation();

  return (
    <Card className={card} elevation={3}>
      <CardContent>
        <Tabs value={selectedTab} onChange={(_, newValue) => setSelectedTab(newValue)}>
          <Tab label={t('dynamics.tabs.lastYear')} value="year" />
          <Tab label={t('dynamics.tabs.lastMonth')} value="month" />
          <Tab label={t('dynamics.tabs.lastWeek')} value="week" />
        </Tabs>
        <Chart selectedTab={selectedTab} />
      </CardContent>
    </Card>
  );
};
