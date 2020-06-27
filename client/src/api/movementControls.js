import { request, parseErrorResponse } from "./request";

export const saveWaypoint = (data) => new Promise((resolve, reject) => {
    request().post('/saveWaypoint', data)
        .then(res => {
            const { data } = res.data;
            if (data && data.id) resolve(data)
            else {
                reject(new Error('Something went wrong!'))
            }
        })
        .catch(parseErrorResponse)
        .then(reject)
})