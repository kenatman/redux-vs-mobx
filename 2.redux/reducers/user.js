const initialState = {
    isLogginIn: false,
    data: null,
}

const user = (prevState=initialState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                isLogginIn: true,
                data:action.data,
            };
        case 'LOG_OUT':
            return {
                isLogginIn: false,
                data: null,

            }
        default:
            return prevState;
    }
};
module.exports = user;