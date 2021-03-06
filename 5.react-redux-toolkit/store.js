const {configureStore, getDefaultMiddleware} = require('@reduxjs/toolkit')
const reducer = require('./slices');


const firstMiddleware = (store) => (next) => (action) => {
    console.log('액션로깅!@@', action);
    next(action);
};


const store = configureStore({
    reducer,
    middleware: [firstMiddleware, ...getDefaultMiddleware()],
    devTools: process.env.NODE_ENV !== 'production',
});

module.exports = store;
