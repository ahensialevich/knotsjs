import { client } from './client';
import { ConvertResponseType, FetchDynamicsResponseType } from './types';

type ConvertCurrentPayloadType = {
  from: string;
  to: string;
};

type FetchDynamicsPayloadType = {
  from: string;
  to: string;
  startAt: string;
  endAt: string;
};

export const api = {
  convert: async (_: string, { from, to }: ConvertCurrentPayloadType) => {
    const { data } = await client.get<ConvertResponseType>('/latest', { params: { base: from, symbols: to } });
    return data;
  },
  fetchDynamics: async (_: string, { from, to, startAt, endAt }: FetchDynamicsPayloadType) => {
    const { data } = await client.get<FetchDynamicsResponseType>('/history', {
      params: {
        start_at: startAt,
        end_at: endAt,
        base: from,
        symbols: to,
      },
    });
    return data;
  },
};
