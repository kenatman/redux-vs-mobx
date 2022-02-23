const {createStore} = require('redux');

// 리듀서란 action(객체)를 받아서 새로운 state를 만들어 주는 애(불변성 조심!)
const reducer = (prevState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...prevState,
                user: action.data,
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: null
            }
        case 'ADD_POST':
            return {
                ...prevState,
                posts: [...prevState.posts, action.data]
            }
        default:
            return prevState;
    }
};

const initialState = {
    user: null,
    posts:[]
};

const store = createStore(reducer, initialState);

// 이벤트리스너 같은 애
store.subscribe(()=>{ // 화면 바꾸는 subscribe 기능은 react-redux안에 들어있다.
    console.log('changed!') // 화면 바꿔주는 코드 여기서...
})


// action creator
const logIn = (data) => {return {
    // action은 객체
    type:'LOG_IN',
    data
}};

const logOut = () => {return {
    type: 'LOG_OUT'
}}

const addPost = (data) => {
    return {
        type: 'ADD_POST',
        data
    }
}

console.log('1st', store.getState());

store.dispatch(logIn({
    id:1,
    name: 'kenatman',
    admin: true
}));

console.log('2nd', store.getState());

store.dispatch(addPost({
    userId: 1,
    id: 1,
    content: '헬로우 리덕스@'
}));

console.log('3rd', store.getState());

store.dispatch(addPost({
    userId: 1,
    id: 2,
    content: '하이욤 리덕스!!'
}));

console.log('4th', store.getState());

store.dispatch(logOut());

console.log('5th', store.getState());



