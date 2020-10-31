import React, { FC, useState } from 'react';
import { Box } from '@material-ui/core';
import { Datum, ResponsiveLine, Serie } from '@nivo/line';
import { FetchDynamicsResponseType } from 'src/api/types';
import { useQuery } from 'react-query';
import { api } from 'src/api';

const theme = {
  textColor: 'white',
};

const mapToNivoData = (data?: FetchDynamicsResponseType): Datum[] => {
  if (!data) return [];
  return Object.entries(data.rates).map(([key, value]) => ({ x: key, y: Object.values(value)[0] }));
};

type Props = {
  from: string;
  to: string;
  startAt: string;
  endAt: string;
};

export const Chart: FC<Props> = ({ from, to, startAt, endAt }) => {
  const [nivoDatum, setNivoDatum] = useState<Datum[]>([]);

  useQuery(['fetchDynamics', { from, to, startAt, endAt }], api.fetchDynamics, {
    onSuccess: (data) => setNivoDatum(mapToNivoData(data)),
  });

  const nivoData: Serie = { id: 'rate', data: nivoDatum };

  return (
    <Box mt={2} height={300} p={1}>
      <ResponsiveLine
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
      />
    </Box>
  );
};
