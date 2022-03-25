import React, {useCallback} from 'react';
import {useLocalStore, useObserver, useAsObservableSource} from 'mobx-react';
// useAsObservableSource는 prop들에 적용하면 observable이 된다.
import {action} from 'mobx';
import useStore from "./useStore";
/*import {userStore, postStore} from './store'*/

const App = () => {
    const {userStore, postStore} = useStore();
    // observable은 원시타입까지 디스트럭처링하면 꺠진다. 객체단위까지만 디스트럭처링해야함.

    const state = useLocalStore(() => ({
        name: '',
        password: '',
        onChangeName: action(function(e){
            this.name = e.target.value
        }),
        onChangePassword: action(function(e){
            this.password = e.target.value;
        }),
    }))

    const onLogin = useCallback(() => {
        userStore.logIn({nickname: 'kenataman', password: '비밀번호'})
    }, []);

    const onLogout = useCallback(() => {
        userStore.logOut();
    }, [])

    return useObserver(() => (
        <div>
            {userStore.isLogginIn
                ? <div>로그인 중...</div>
                : userStore.data
                    ? <div>{userStore.data.nickname}</div>
                    : '로그인 해주세요!@'}
            {!userStore.data
                ? <button onClick={onLogin}>로그인</button>
                : <button onClick={onLogout}>로그아웃</button>}
            <div>{postStore.data.length}</div>
            <div>
                <input value={state.name} onChange={state.onChangeName}/>
                <input value={state.password} onChange={state.onChangePassword}/>
            </div>
        </div>
    ))
}


export default App;