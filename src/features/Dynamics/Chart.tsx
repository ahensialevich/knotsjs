import React, { FC, useContext, useState } from 'react';
import { Box } from '@material-ui/core';
import { Datum, ResponsiveLineCanvas, Serie } from '@nivo/line';
import { useQuery } from 'react-query';
import { api } from 'src/api';
import { context } from 'context';
import { getHistoryDate, dateFormat, mapToNivoData } from 'utils';
import { format } from 'date-fns';

const theme = {
  textColor: 'white',
};

type Props = {
  selectedTab: string;
};

const today = new Date();

export const Chart: FC<Props> = ({ selectedTab }) => {
  const [nivoDatum, setNivoDatum] = useState<Datum[]>([]);
  const { from, to } = useContext(context);

  const endAt = format(today, dateFormat);
  const startAt = getHistoryDate(today, selectedTab);

  useQuery(['fetchDynamics', { from, to, startAt, endAt }], api.fetchDynamics, {
    onSuccess: (data) => setNivoDatum(mapToNivoData(data)),
  });

  const nivoData: Serie = { id: 'rate', data: nivoDatum };

  return (
    <Box mt={2} height={300} p={1}>
      <ResponsiveLineCanvas
        theme={theme}
        data={[nivoData]}
        curve="cardinal"
        margin={{ top: 5, right: 20, bottom: 5, left: 50 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        yFormat=" >-.2f"
        axisBottom={null}
        enableArea
        enableGridY={false}
        enablePoints={false}
        enableSlices="y"
      />
    </Box>
  );
};
