import { client } from './client';
import { ConvertPayloadType } from './types';

type ConvertCurrentType = {
  from: string;
  to: string;
};

export const api = {
  convert: async (_: string, { from, to }: ConvertCurrentType) => {
    const { data } = await client.get<ConvertPayloadType>('/latest', { params: { base: from, symbols: to } });
    return data;
  },
};
