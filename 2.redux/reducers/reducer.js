// 리듀서란 action(객체)를 받아서 새로운 state를 만들어 주는 애(불변성 조심!)
const reducer = (prevState, action) => {
    switch(action.type){
        case 'LOG_IN':
            return {
                ...prevState,
                user: {
                    isLogginIn: true,
                    data:action.data,
                }
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user: {
                    isLogginIn: false,
                    data: null
                }
            }
        case 'ADD_POST':
            return {
                ...prevState,
                posts: [...prevState.posts, action.data]
            }
        default:
            return prevState;
    }
};

module.exports = reducer;