const {produce} = require('immer');

/*immer 기본형태
nextState = produce(prevState, (draft) => {})*/

const initialState = {
    isLogginIn: false,
    data: null,
}

const user = (prevState=initialState, action) => {
    return produce(prevState, (draft) => {
        switch(action.type){
            case 'LOG_IN_REQUEST':
                draft.isLogginIn = true;
                draft.data = null;
                break;
            case 'LOG_IN_SUCCESS':
                draft.isLogginIn = false;
                draft.data = action.data;
                break;
            case 'LOG_IN_FAILURE':
                draft.isLogginIn = false;
                draft.data = null;
                break;

            case 'LOG_OUT':
                draft.data = null;
                break;

            default:
                break;
        }
    })

};
module.exports = user;