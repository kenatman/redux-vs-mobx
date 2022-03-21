const {observable} = require('mobx');

const userStore = observable({
    isLogginIn: false,
    data: null,
    logIn(data) {
        this.isLogginIn = true;
        setTimeout(() => {
            this.data = data;
            this.isLogginIn = false;
            postStore.data.push(1)
        }, 2000)
    },
    logOut() {
        this.data = null;
    }
});

const postStore = observable({
    data: [],
    addPost(data) {
        this.data.push(data)
    }
});

module.exports = {userStore, postStore};