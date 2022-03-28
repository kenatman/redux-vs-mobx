import {all, call, fork, takeLatest, put, take, delay} from 'redux-saga/effects';
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE} from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI() {
    // 서버에 요청
}

function* login() {
    try {
        yield call(loginAPI);
        yield put({ // put은 dispatch와 동일
            type: LOG_IN_SUCCESS
        })
    } catch (err) {
        console.log(err);
        yield put({ // login API 실패
            type: LOG_IN_FAILURE
        })
    }
}

function* watchLogin() {
    // takeLatest는 LOG_IN 액션이 dispatch 되길 기다렸다가 login 제너레이터를 호출한다.
    yield take(LOG_IN_REQUEST);
    yield delay(2000);
    yield put({
        type: LOG_IN_SUCCESS
    })
}

function* watchSignUp(){

}



export default function* userSaga() {
    yield all([
        watchLogin(),
        watchSignUp(),
    ])
}