import fetch from 'dva/fetch';
import {Toast} from 'antd-mobile';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};


function parseJSON(response) {
    return response.json();
}

function checkStatus(response) {

    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const errorText = codeMessage[response.status] || response.statusText;
    Toast.fail(errorText, 2);
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
}

//或许这次用不上
export function toParams(param) {
    var result = ""
    for (let name in param) {
        if (typeof param[name] !== 'function') {
            result += "&" + name + "=" + encodeURI(param[name]);
        }
    }
    return '?' + result.substring(1)
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @param type
 * @return {object}           An object containing either "data" or "err"
 */
//我参考之前封装的umi-requst
export default function request(url, options) {
    const defaultOptions = {
        credentials: 'include',
    };
    // const token = localStorage.getItem('token')
    const newOptions = {...defaultOptions, ...options};
    if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
        if (!(newOptions.body instanceof FormData)) {

            newOptions.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...newOptions.headers,
                // token,
            };
            newOptions.body = JSON.stringify(newOptions.body);
            // newOptions.body = toParams(newOptions.body);

        }
    } else {
        url = newOptions.params ? url + toParams(newOptions.params) : url
        newOptions.headers = {
            // token,
            Accept: 'application/json',
            ...newOptions.headers,
        };
    }
    return fetch(url, newOptions)
        .then(checkStatus)
        .then(parseJSON)
        .then(data => {
            if (data.code !== '200') {
                Toast.info(data.msg, 2)
                return ;
            }
            return {data}
        })
        .catch(err => ({err}));
}
