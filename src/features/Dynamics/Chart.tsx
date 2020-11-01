import React, { FC, useContext, useState } from 'react';
import { Box } from '@material-ui/core';
import { Datum, ResponsiveLineCanvas, Serie } from '@nivo/line';
import { useQuery } from 'react-query';
import { api } from 'src/api';
import { appContext } from 'context';
import { getHistoryDate, dateFormat, mapToNivoData } from 'utils';

// canvas based implementation instead of SVG/HTML because of large amount of data.
// Also last year chart isnt look very good. Better solution will be adjusting an endpoint to recieve currency dynamics with month-size step, for example, in case of large range of data.
// In case of exchangeratesapi.io we receive day-by-day rate change statystics tho.

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
  const context = useContext(appContext);

  const endAt = format(today, dateFormat);
  const startAt = getHistoryDate(today, selectedTab);

  useQuery(['fetchDynamics', { from: context?.state.from, to: context?.state.to, startAt, endAt }], api.fetchDynamics, {
    onSuccess: (data) => setNivoDatum(mapToNivoData(data)),
  });

  const nivoData: Serie = { id: 'rate', data: nivoDatum };

  return (
    <Box mt={2} height={500} p={1} color="black">
      <ResponsiveLineCanvas
        theme={theme}
        data={[nivoData]}
        curve="cardinal"
        axisTop={null}
        margin={{ top: 15, right: 20, bottom: 70, left: 50 }}
        yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: true, reverse: false }}
        axisBottom={{ tickRotation: -45 }}
        yFormat=">-.2f"
        enablePoints={false}
        enableSlices="y"
      />
    </Box>
  );
};
