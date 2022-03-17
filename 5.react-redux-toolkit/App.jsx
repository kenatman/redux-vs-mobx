import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "./thunks/user";
import userSlice from "./slices/user";
import {addPost} from "./thunks/post";

const App = () => {
    const user = useSelector((state) => state.user);
    // useSelector 쪼개기. 리턴값이 원시값이면 좋다. 객체면 하나 바뀌면 다 리렌더링됨. => 적당한 타협, 너무 이른 최적화는 안 하느니만 못하다.
/*    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);*/
    const posts = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


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
       setEmail(e.target.value);
    },[])

    const onChangePassword = useCallback((e)=>{
        setPassword(e.target.value);
    },[])

    const onSubmit = useCallback((e)=>{
        e.preventDefault();
        dispatch(userSlice.actions.setLoginForm({email, password}))
    },[dispatch ,email, password])

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
            <form onSubmit={onSubmit}>
                <input type="email" value={email} onChange={onChangeEmail}/>
                <input type="password" value={password} onChange={onChangePassword}/>
                <button>제출</button>
            </form>
        </div>
    )
}

export default App;