import React from 'react';
import {observer} from 'mobx-react';
import {observable} from 'mobx';
import {userStore, postStore} from './store'

// @observer 데코레이터는 일단 함수다!! 클래스와 함께 사용. export에서도 가능. 단, 클래스가 아닌 객체리터럴 등과는 함께 사용x
class App extends React.Component {
    // mobx는 state를 observable로 만들 수 있다. 즉, setState하지 않고 직접 바꿔도 렌더링이 된다.
    state = observable({
        name: '',
        password: '',
    })

    onLogin = () => {
        userStore.logIn({nickname: 'kenataman', password: '비밀번호'})
    }

    onLogout = () => {
        userStore.logOut();

    }

    onChangeName = (e) => {
        // setState 아님.
        this.state.name = e.target.value;
    }

    onChangePassword = (e) => {
        // setState 아님.
        this.state.password = e.target.value;
    }

    render() {
        return (
            <div>
                {userStore.isLogginIn
                    ? <div>로그인 중...</div>
                    : userStore.data
                        ? <div>{userStore.data.nickname}</div>
                        : '로그인 해주세요!@'}
                {!userStore.data
                    ? <button onClick={this.onLogin}>로그인</button>
                    : <button onClick={this.onLogout}>로그아웃</button>}
                <div>{postStore.data.length}</div>
                <div>
                    <input value={this.state.name} onChange={this.onChangeName}/>
                    <input value={this.state.password} onChange={this.onChangePassword}/>
                </div>

            </div>
        )
    }
}


export default observer(App) ;