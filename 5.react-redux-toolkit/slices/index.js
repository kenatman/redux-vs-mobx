const {combineReducers}  = require('@reduxjs/toolkit');
const userSlice = require('./user');
const postSlice = require('./post');

module.exports = combineReducers({
    user: userSlice.reducer,
    posts: postSlice.reducer,
})
