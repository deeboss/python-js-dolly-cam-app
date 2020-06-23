import axios from 'axios';
import { baseURL } from './request';

export const makePiBlink = () =>
  axios.get(`${baseURL}/blinkLed`)
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
    })