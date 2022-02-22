const {createStore} = require('redux');

// 리듀서란 action(객체)를 받아서 새로운 state를 만들어 주는 애(불변성 조심!)
const reducer = (prevState, action) => {
    switch(action.type){
        case 'CHANGE_COMP_A':
            return {
                ...prevState,
                compA: action.data,
            };
        case 'CHANGE_COMP_B':
            return {
                ...prevState,
                compB: action.data
            }
        case 'CHANGE_COMP_C':
            return {
                ...prevState,
                compC: action.data
            }
        default:
            return prevState;
    }
};

const initialState = {
    compA: 'a',
    compB: 12,
    compC: null
};

const store = createStore(reducer, initialState);

store.subscribe(()=>{ // 화면 바꾸는 subscribe 기능은 react-redux안에 들어있다.
    console.log('changed!') // 화면 바꿔주는 코드 여기서...
})

console.log('1st', store.getState());

// action creator
const changeCompA = (data) => {return {
    // action은 객체
    type:'CHANGE_COMP_A',
    data
}};

store.dispatch(changeCompA(`b`));

console.log('2nd', store.getState())

