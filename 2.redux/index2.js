const {createStore} = require('redux');
const reducer = require('./reducers');
const {logIn, logOut} = require('./actions/user');
const {addPost} = require('./actions/post');

const initialState = {
    user: {
        isLogginIn: true,
        data: null,
    },
    posts:[],
    comments:[],
    favorites:[],
    history:[],
    likes:[],
    followers:[],
};

const store = createStore(reducer, initialState);

// 이벤트리스너 같은 애
store.subscribe(()=>{ // 화면 바꾸는 subscribe 기능은 react-redux안에 들어있다.
    console.log('changed!') // 화면 바꿔주는 코드 여기서...
})


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
