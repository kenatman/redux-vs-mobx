const {createSlice} = require('@reduxjs/toolkit');
const {logIn} = require('../thunks/user');

const initialState = {
    isLogginIn: false,
    data: null,
    email: "",
    password: "",
    prices: Array(100).fill().map((v, i) => ((i + 1) * 100))
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOut: (state, action) => {
            state.data = null;
        },
       /* setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        }*/
        setLoginForm: (state, action) => {
            state.email = action.payload.email;
            state.password = action.payload.password;
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