const {observable, autorun, runInAction, reaction, action} = require('mobx');

const state = observable({
    compA: 'a',
    compB: 12,
    compC: null
});

// 다 감지한다.
autorun(()=>{
    console.log('changed', state.compA)
});

// 특정 값이 변할 때만 감지할 수 있다.
reaction(()=>{
 return state.compB
}, ()=>{
    console.log('reaction', state.compB)
});

// 바로 실행하지 않을 때.. action(()=>{})() === runInAction
const change = action(()=>{
    state.compA = 'f';
    state.compB = 56;
    state.compC = 'hehe';
});

change();

runInAction(()=>{
    state.compA = 'c';
    state.compB = 23;
    state.compC = 'hi';
})

runInAction(()=>{
    state.compA = 'd';
});

