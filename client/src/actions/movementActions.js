import axios from "axios";
import { baseApiURL, request, parseErrorResponse } from "./request";


export const saveWaypoint = (data) =>
  axios.post(baseApiURL+'/saveWaypoint/' + data.id, data).then(res => {
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

// export const saveWaypoint = (data) => new Promise((resolve, reject) => {
//     request().post('/saveWaypoint/' + data.id, data)
//         .then(res => {
//             const { data } = res.data;
//             if (data && data.id) {resolve(data)}
//             else {
//                 reject(new Error('Something went wrong!'))
//             }
//         })
//         .catch(parseErrorResponse)
//         .then(reject)
// })