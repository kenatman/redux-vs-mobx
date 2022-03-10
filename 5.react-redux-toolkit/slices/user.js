const {createSlice} = require('@reduxjs/toolkit');
const {logIn} = require('../thunks/user');

const initialState = {
    isLogginIn: false,
    data: null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.data = null;
        }
    },
    extraReducers: {
        [logIn.pending] : (state, action) => {
            state.isLogginIn = true;
        },
        [logIn.fulfilled] : (state, action) => {
            state.isLogginIn = false;
            state.data = action.payload;
        },
        [logIn.rejected] : (state, action) => {
            state.isLogginIn = false;
            state.data = null;
        }
    },
})


module.exports = userSlice;