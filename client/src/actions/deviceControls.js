import axios from "axios";

import { baseApiURL, request, parseErrorResponse } from "./request";

// export const makeDeviceBlink = () =>
//   new Promise((resolve, reject) => {
//     request()
//       .get(`/blinkLed`)
//       .then((res) => {
//         const { data } = res.data;
//         if (data) resolve(data);
//         else {
//           reject(new Error("Something went wrong!"));
//         }
//       })
//       .catch(parseErrorResponse)
//       .then(reject);
//   });


export const makeDeviceBlink = () =>
  axios.post(baseApiURL+'/blinkLed', {"hello": "world"}).then(res => {
    // do good things
    console.log(res);
  })
  .catch(err => {
  if (err.response) {
    // client received an error response (5xx, 4xx)
    console.log(err.response)
  } else if (err.request) {
    // client never received a response, or request never left
    console.log(err.request)
  } else {
    // anything else
    console.log("something else...")
  }
})


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
