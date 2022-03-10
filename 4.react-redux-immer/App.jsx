import React from 'react';
import {logIn, logOut} from "./actions/user";
import {connect} from 'react-redux'

class App extends React.Component {
    onClick = () => {
        this.props.dispatchLogIn({
            id: 'kenatman',
            password: '비밀번호'
        })
    }

    onLogout = () => {
        this.props.dispatchLogOut();
    }

    render() {
        const {user} = this.props;
        return (
            <div>
                {user.isLogginIn
                    ? <div>로그인 중...</div>
                    : user.data
                        ? <div>{user.data.nickname}</div>
                        : '로그인 해주세요!@'}
                {!user.data
                    ? <button onClick={this.onClick}>로그인</button>
                    : <button onClick={this.onLogout}>로그아웃</button>}
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        user: state.user,
        posts: state.posts,
    }
} // reselect

const mapDispatchToProps = (dispatch) => {
    return {
        dispatchLogIn : (data) => dispatch(logIn(data)),
        dispatchLogOut : () => dispatch(logOut()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);