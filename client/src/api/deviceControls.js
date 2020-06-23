import { request, parseErrorResponse } from "./request";

export const makePiBlink = () =>
  new Promise((resolve, reject) => {
    request()
      .get(`/blinkLed`)
      .then((res) => {
        const { data } = res.data;
        if (data) resolve(data);
        else {
          reject(new Error("Something went wrong!"));
        }
      })
      .catch(parseErrorResponse)
      .then(reject);
  });