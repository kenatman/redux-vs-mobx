import {all, call, fork, takeLatest, put, take, delay, takeEvery} from 'redux-saga/effects';
import {LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE} from '../reducers/user'

const HELLO_SAGA = 'HELLO_SAGA';

function loginAPI() {
    // 서버에 요청
}
// call, fork 둘다 함수를 호출하는 것.
// call은 순서가 중요할 때 사용. 끝날 때까지 기다림.
// fork는 순서 상관 없을 때. 요청하고 다음것 실행.
function* login() {
    try {
        yield fork(logger); // logger는 내 기록을 로깅하는 함수, 10초 걸림.
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
    yield takeEvery(LOG_IN_REQUEST, login);
}

function* watchSignUp() {

}

function* hello() {
    yield delay(1000);
    yield put({
        type: 'BYE_SAGA'
    });
}

// takeEvery는 저네러이터 + while(true) 역할
// takeLatest는 이전요청이 끝나지 않은 게 있다면 이전 요청을 취소함!! => ex) 로그인 여러번 요청해도 마지막 한번만 처리.
function* watchHello() {
    yield takeLatest(HELLO_SAGA, hello)
}


/*function* watchHello(){
    while(true){
        yield take(HELLO_SAGA);
        console.log(1);
        console.log(2);
        console.log(3);
        console.log(4);
    }
}*/


export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchSignUp),
        fork(watchHello),
    ])
}