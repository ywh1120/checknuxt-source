import { axios } from 'axios';

const host = process.env.BASE_URL || ''
const object={};
object.request = function(method, url, params={}){
    const options = {
        method ,
        url : `${host}${url}`
    };

    if (method === 'post' || method === 'put'){
        options.data = params;
    }else{
        options.params = params;
    }

    return axios(options)
    .then(res => {
        return Promise.resolve(res);
    })
};

object.reservate = params => {
    return object.request('post', '/api/reservate', params);
};
export default object;