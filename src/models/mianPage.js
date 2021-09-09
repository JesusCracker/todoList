import {fetchInfo, saveInfo} from "../services";

export default {

    namespace: 'mainPage',

    state: {
        userInfo: {
            account: undefined,
            address: undefined,
            applyDate: undefined,
            giftCode: undefined,
            giftName: undefined,
            phoneNo: undefined,
            serialCode: undefined,
            userName: undefined
        },
    },

    subscriptions: {
        setup({dispatch, history}) {
        },
    },

    effects: {

        * fetchUserInfo({payload}, {call, put}) {
            const response = yield call(fetchInfo, payload);
            yield put({
                type: 'saveUser',
                payload: response,
            });
        },

        * saveUserInfo({payload}, {call, put}) {
            return yield call(saveInfo, payload);
        }


    },

    reducers: {
        saveUser(state, action) {
            return {
                ...state,
                userInfo: action.payload.data.data !== null && action.payload.data.data,
            };
        },
    },

};
