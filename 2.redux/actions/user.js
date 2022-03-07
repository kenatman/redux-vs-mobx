// async action creator
const logIn = (data) => {
    return (dispatch, getState) => { // async action
        dispatch(logInRequest(data));
        try {
            setTimeout(() => {
                dispatch(logInSuccess({
                    userId: 1, nickname: 'kenatman'
                }))
            }, 2000)
        } catch (err) {
            dispatch(logInFailure(err))


        }
}
};

// sync action
const logInRequest = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}

const logInSuccess = (data) => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

const logInFailure = (data) => {
    return {
        type: 'LOG_IN_FAILURE',
        data,
    }
}

const logOut = () => {return {
    type: 'LOG_OUT'
}}



module.exports={
    logIn, logOut
}