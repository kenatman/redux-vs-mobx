const {createAsyncThunk} = require("@reduxjs/toolkit");

const delay = (time, value) => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(value)
    }, time)
})

const addPost = createAsyncThunk(
    'post/addPost',
    async (data, thunkAPI) => {
        const result = await delay(500, {title: '새 게시글', content: '안녕하세요!@'});
        return result;
    }
)

module.exports = {
    addPost
}

