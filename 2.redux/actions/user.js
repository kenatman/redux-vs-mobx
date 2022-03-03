// action creator
const logIn = (data) => {return {
    // action은 객체
    type:'LOG_IN',
    data
}};

const logOut = () => {return {
    type: 'LOG_OUT'
}}



module.exports={
    logIn, logOut
}