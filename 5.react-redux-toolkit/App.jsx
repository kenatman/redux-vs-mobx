import React, {useCallback, useMemo, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "./thunks/user";
import userSlice from "./slices/user";
import {addPost} from "./thunks/post";
import {createSelector} from "@reduxjs/toolkit" // reselect

// createSelector는 컴포넌트 밖 캐싱개념.
const priceSelector = (state)=> state.user.prices;

const sumPriceSelector = createSelector(priceSelector, (prices) => prices.reduce((a, c) => a + c, 0))
// createSelector를 export하려면 아래처럼 함수형태로 묶어줘야한다.

export const makeSumPriceSelector = () => createSelector(priceSelector, (prices) => prices.reduce((a, c) => a + c, 0));

const App = () => {
    const user = useSelector((state) => state.user);
    // useSelector 쪼개기. 리턴값이 원시값이면 좋다. 객체면 하나 바뀌면 다 리렌더링됨. => 적당한 타협, 너무 이른 최적화는 안 하느니만 못하다.
/*    const email = useSelector((state) => state.user.email);
    const password = useSelector((state) => state.user.password);*/
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const totalPrices = useSelector(makeSumPriceSelector());


    // 리덕스 스토어에서 관리할 것 3개
    const [loadings, setLoadings] = useState({});
    const [errors, setErrors] = useState({});
    const [dones, setDones] = useState({});

    // 컴포넌트에서 관리할 것
    const [loadingIds, setLoadingIds] = useState([]);



    const onClick = useCallback(async () => {
        const id = new Date().valueOf();
        // 리덕스 관리용
        setLoadings((prev) => ({
            ...prev,
            [id]: { type: "LOGIN_LOADING" }
            }))
        // 컴포넌트 관리용
        setLoadingIds((prev) => prev.concat(id));
        try{
            const response  = await axios.post('/login');

            setDones((prev) => ({...prev, [id]: {type: "LOGIN_DONE"}}));
        }
        catch(err){
            setErrors((prev) => ({...prev, [id]: {type: "LOGIN_ERROR"}}))
        }
        finally {
            setLoadings((prev) => {
                const newObj = JSON.parse(JSON.stringify(prev));
                delete newObj[id];
                return newObj;
            });
        }
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
            <div>
                <b>{totalPrices}</b>
            </div>
        </div>
    )
}

export default App;