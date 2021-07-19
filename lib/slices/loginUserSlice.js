import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: '',
        name: '',
        email: '',
        nickName: '',
        color: '',
    },
    Inbox: {},
    star: {},
    important: {},
    sent: {},
    trash: {}
}

export const loginUserSlice = createSlice({
    name: 'loginUser',
    initialState,
    reducers: {
        setLoginUser: (state, action) => {
            state.user = action.payload
        },
        setInbox: (state, action) => {
            state.Inbox = action.payload
        },
        setStar: (state, action) => {
            state.star = action.payload
        },
        logout: (state) => {
            state.user = initialState.user
            state.Inbox = initialState.Inbox
            state.star = initialState.star
            state.important = initialState.important
            state.sent = initialState.sent
            state.trash = initialState.trash

        },
        addStar: (state, action) => {
            state.star = Object.assign(state.star, action.payload)
        },
        removeStar: (state, action) => {
            delete state.star[action.payload]
        },
        addLoginSent: (state, action) => {
            state.sent = Object.assign(state.sent, action.payload)
        }
    }
})

export const {
    setLoginUser,
    setInbox,
    setStar,
    logout,
    addStar,
    removeStar,
    addLoginSent
} = loginUserSlice.actions

export default loginUserSlice.reducer