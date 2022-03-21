import React, {useCallback} from 'react';
import {useLocalStore, useObserver} from 'mobx-react';
import {userStore, postStore} from './store'

const App = () => {
    const state = useLocalStore(() => ({
        name: '',
        password: '',
        onChangeName(e) {
            this.name = e.target.value
        },
        onChangePassword(e) {
            this.password = e.target.value;
        }
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