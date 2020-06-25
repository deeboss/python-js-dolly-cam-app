import { request, parseErrorResponse } from "./request";

export const makeDeviceBlink = () =>
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


export const restartDevice = () =>
  new Promise((resolve, reject) => {
    request()
      .get(`/restart`)
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

export const shutdownDevice = () =>
  new Promise((resolve, reject) => {
    request()
      .get(`/shutdownDevice`)
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

export const closeServer = () =>
  new Promise((resolve, reject) => {
    request()
      .get(`/shutdown`)
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
