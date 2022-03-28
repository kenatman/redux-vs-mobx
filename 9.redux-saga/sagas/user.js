import {all, call, fork, takeLatest, put, take} from 'redux-saga/effects';
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
    yield takeLatest(LOG_IN_REQUEST, login)
}

function* watchSignUp(){

}

function* watchHello() {
    console.log('before saga')
    // 이벤트리스너를 동기적으뢰 표현했다고 보면 됨.
    // 함수자체를 끝내지 않기 위해. while(true)는 제너레이터에서만 가능한 문법. 무한히 HELLO_SAGA를 리스닝한다.
    for(let i = 0; i < 5; i++) { // 5번만 이번트리스닝 할 때
        yield take(HELLO_SAGA);
        console.log('after saga') // 비동기 요청, 타이머 넣어도 되고.
    }
}

export default function* userSaga() {
    yield all([
        watchHello(),
        watchLogin(),
        watchSignUp(),
    ])
}