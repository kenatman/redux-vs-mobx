const {observable, configure, action} = require('mobx');

configure({enforceActions: "always"});

const userStore = observable({
    isLogginIn: false,
    data: null,
    logIn: action(function (data) {
        this.isLogginIn = true;
        setTimeout(action(() => {
            this.data = data;
            this.isLogginIn = false;
            postStore.data.push(1)
        }, 2000))
    }),
    logOut() {
        this.data = null;
    }
});

const postStore = observable({
    data: [],
    addPost(data) {
        this.data.push(data)
    },
    // getter와 setter : 선언은 함수처럼 하지만 사용은 일반값처럼. getter는 mobx에서 computed(캐싱)의 역할.
    get postLength() {
        return this.data.length;
    },
    /*    set post(value){
            this.data = value;
        }*/
});

module.exports = {userStore, postStore};