import request from '../utils/request';



export function saveInfo(payload) {
    return request('/api/client/userGiftInfo/apply', {
        method: 'POST',
        body: payload
    })
}

//获取用户领取记录
export function fetchInfo(payload) {
    return request('/api/client/userGiftInfo/historyApply', {
        method: 'POST',
        body: payload
    })
}