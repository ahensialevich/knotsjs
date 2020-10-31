export type ConvertResponseType = {
  base: string;
  date: string;
  rates: { [key: string]: number };
};

export type FetchDynamicsResponseType = {
  start_at: string;
  base: string;
  end_at: string;
  rates: { [key: string]: { [key: string]: number } };
};
