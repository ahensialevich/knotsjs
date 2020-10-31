import Axios from 'axios';

const baseURL = 'https://api.exchangeratesapi.io/';

export const client = Axios.create({ baseURL });
