import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    thread: {
        'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c': {
            title: '안녕하세요',
            mails: ['fc275dcc-1ac1-4e06-a5a7-2b342b033e3c']
        }
        ,
        'f420483c-3701-4136-8fc0-4053f84a7c9a': {
            title: '000 관련 메일 드립니다!',
            mails: ['f420483c-3701-4136-8fc0-4053f84a7c9a']
        },
        'ea20eb99-76d3-4229-a370-423e438cc0f9': {
            title: '읽은 메일 입니다!',
            mails: ['ea20eb99-76d3-4229-a370-423e438cc0f9']
        }
    }
}

export const threadSlice = createSlice({
    name: 'thread',
    initialState,
    reducers: {
        addThread: (state, action) => {
            state.thread = Object.assign(state.thread, action.payload)
        },
        addThreadMails: (state, action) => {
            state.thread[action.payload.key].mails = state.thread[action.payload.key].mails.concat(action.payload.id)
        }

    }

})

export const {
    addThread,
    addThreadMails
} = threadSlice.actions

export default threadSlice.reducer