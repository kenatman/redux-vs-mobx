const {createStore, applyMiddleware} = require('redux');
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

const firstMiddleware = (store) => (next) => (action) => {
    console.log('액션로깅!@@', action);
    next(action);
};

const thunkMiddleware = (store) => (next) => (action) => {
    if(typeof action === 'function'){
        return action(store.dispatch, store.getState);
    }
    return next(action);
}

const enhancer = applyMiddleware(firstMiddleware, thunkMiddleware);

const store = createStore(reducer, initialState, enhancer);


console.log('1st', store.getState());

store.dispatch(logIn({
    id:1,
    name: 'kenatman',
    admin: true
}));

/*console.log('2nd', store.getState());

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

console.log('5th', store.getState());*/
