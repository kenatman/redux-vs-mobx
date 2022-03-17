import React, {useCallback} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "./thunks/user";
import userSlice from "./slices/user";
import {addPost} from "./thunks/post";

const App = () => {
    const user = useSelector((state) => state.user);
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();

    const onClick = useCallback(() => {
        dispatch(logIn({
            id: 'kenatman',
            password: '비밀번'
        }))
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userSlice.actions.logOut())
    },[])

    const onAddPost = () => {
        dispatch(addPost())
    }

    const onChangeEmail = useCallback((e)=>{
        dispatch(userSlice.actions.setEmail(e.target.value));
    },[])

    const onChangePassword = useCallback((e)=>{
        dispatch(userSlice.actions.setPassword(e.target.value));
    },[])

    return (
        <div>
            {user.isLogginIn
                ? <div>로그인 중...</div>
                : user.data
                    ? <div>{user.data.nickname}</div>
                    : '로그인 해주세요!@'}
            {!user.data
                ? <button onClick={onClick}>로그인</button>
                : <button onClick={onLogout}>로그아웃</button>}
            <button onClick={onAddPost}>게시물 작성</button>
            <form>
                <input type="email" value={user.email} onChange={onChangeEmail}/>
                <input type="password" value={user.password} onChange={onChangePassword}/>
            </form>
        </div>
    )
}

export default App;