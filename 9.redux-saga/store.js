import {createStore, applyMiddleware, compose} from 'redux';
import reducer  from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const initialState = {
    user: {
        isLogginIn: false,
        data: null,
    },
    posts:[],
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
};

const sagaMiddleware = createSagaMiddleware();

const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware, sagaMiddleware))
    : composeWithDevTools(applyMiddleware(firstMiddleware, thunkMiddleware, sagaMiddleware));

const store = createStore(reducer, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;
