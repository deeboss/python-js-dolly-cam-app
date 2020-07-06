import axios from "axios";
import { baseApiURL, request, parseErrorResponse } from "./request";


export const saveOneWaypoint = (data) => new Promise((resolve, reject) => {
  request().post('/saveWaypoint/' + data.id, data)
    .then(res => {
      // do good things
      const data = res.data;
      if (data) {
        resolve(data)
      } else {
        reject(new Error('Something went wrong!'))
      }
    })
    .catch(parseErrorResponse)
    .then(reject)
});

export const deleteOneWaypoint = (data) => new Promise((resolve, reject) => {
  request().delete('/deleteWaypoint/' + data.id, data)
    .then(res => {
      // do good things
      const data = res.data;
      if (data) {
        resolve(data)
      } else {
        reject(new Error('Something went wrong!'))
      }
    })
    .catch(parseErrorResponse)
    .then(reject)
});

export const deleteAllWaypoints = (data) => new Promise((resolve, reject) => {
  request().delete('/deleteAllWaypoints', data)
    .then(res => {
      // do good things
      const data = res.data;
      if (data) {
        resolve(data)
      } else {
        reject(new Error('Something went wrong!'))
      }
    })
    .catch(parseErrorResponse)
    .then(reject)
});

export const goToWaypoint = (data) => new Promise((resolve, reject) => {
  request().post('/goToWaypoint/' + data.id, data)
    .then(res => {
      // do good things
      const data = res.data;
      if (data) {
        resolve(data)
      } else {
        reject(new Error('Something went wrong!'))
      }
    })
    .catch(parseErrorResponse)
    .then(reject)
});