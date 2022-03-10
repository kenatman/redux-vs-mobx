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
        },
        [addPost.rejected]: (state, action) => {
            state.isLoading = false;
        }
    }

})


module.exports = postSlice;