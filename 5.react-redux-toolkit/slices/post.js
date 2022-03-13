const {createSlice} = require('@reduxjs/toolkit');
const {addPost} = require('../thunks/post');


const initialState = {
    list: [],
    isLoading: false,
};

const postSlice = createSlice({
    name: 'post', initialState,
    reducers: {},
    extraReducers: {
        [addPost.pending]: (state, action) => {
            state.isLoading = true;
        },
        [addPost.fulfilled]: (state, action) => {
            state.isLoading = false;
            state.list.push(action.payload);
            return state;  // immer 사용시 state를 직접 바꾸는 경우 가끔 불변성이 깨지는데 return state; 해주면 해결.
        },
        [addPost.rejected]: (state, action) => {
            state.isLoading = false;
        }
    }

})


module.exports = postSlice;