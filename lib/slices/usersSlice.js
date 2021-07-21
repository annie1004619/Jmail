import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    users: [
        {
            id: '1',
            name: '김지원',
            email: 'annie1004619@jmail.com',
            nickName: '지원',
            color: 'red',
            Inbox: {},
            star: {},
            important: {},
            sent: {
                'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c': ['fc275dcc-1ac1-4e06-a5a7-2b342b033e3c'],
                'f420483c-3701-4136-8fc0-4053f84a7c9a': ['f420483c-3701-4136-8fc0-4053f84a7c9a'],
                'ea20eb99-76d3-4229-a370-423e438cc0f9': ['ea20eb99-76d3-4229-a370-423e438cc0f9']
            },
            trash: {}

        },
        {
            id: '2',
            name: '김쪼꼬',
            email: 'choco@jmail.com',
            nickName: '쪼꼬',
            color: 'green',
            Inbox: {},
            star: {},
            important: {},
            sent: {},
            trash: {}
        },
        {
            id: '3',
            name: '홍길동',
            email: 'hong@jmail.com',
            nickName: '길동',
            color: 'blue',
            Inbox: {
                'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c': false,
                'f420483c-3701-4136-8fc0-4053f84a7c9a': false,
                'ea20eb99-76d3-4229-a370-423e438cc0f9': true
            },
            star: {
                'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c': ['fc275dcc-1ac1-4e06-a5a7-2b342b033e3c']
            },
            important: {},
            sent: {},
            trash: {}
        }
    ]
}

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addInbox: (state, action) => {
            state.users[action.payload.index].Inbox = Object.assign(state.users[action.payload.index].Inbox, action.payload.id)
        },
        addSent: (state, action) => {
            state.users[action.payload.index].sent = Object.assign(state.users[action.payload.index].sent, action.payload.id)
        }
    }

})

export const {
    addInbox,
    addSent
} = usersSlice.actions

export default usersSlice.reducer