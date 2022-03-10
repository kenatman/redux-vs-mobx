const {produce} = require('immer');

const initialState = [];

const post = (prevState=initialState, action) => {
    return produce(prevState, (draft)=>{
        switch(action.type){
            case 'ADD_POST':
                draft.push(action.data)
              break;
            default:
                break;
        }
    })
};
module.exports = post;