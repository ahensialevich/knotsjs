import { Datum } from '@nivo/line';
import { FetchDynamicsResponseType } from 'src/api/types';

export const mapToNivoData = (data: FetchDynamicsResponseType): Datum[] =>
  Object.entries(data.rates)
    .map(([key, value]) => ({ x: key, y: Object.values(value)[0] }))
    .reverse();
