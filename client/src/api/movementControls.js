import { request, parseErrorResponse } from "./request";

export const saveWaypoint = (data) => new Promise((resolve, reject) => {
    // console.log(data);
    console.log(data.id);
    request().post('/saveWaypoint/' + data.id, data)
        .then(res => {
            const { data } = res.data;
            if (data && data.id) {
                resolve(data)
            } else {
                reject(new Error('Something went wrong!'))
            }
        })
        .catch(parseErrorResponse)
        .then(reject)
})