import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    mailList: {
        'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c': {
            id: 'fc275dcc-1ac1-4e06-a5a7-2b342b033e3c',
            sender: {
                name: '김지원', email: 'annie1004619@jmail.com', nickName: '지원',
                color: `bg-red-400`,
            },
            date: '1626539353.09',
            body: {
                title: '안녕하세요',
                content: '안녕하세요 저는 김지원이라고해요 '
            },
            receiver: [
                'hong@jmail.com',
                'ringle@jmail.com',
                'hi@jmail.com'
            ]
        },
        'f420483c-3701-4136-8fc0-4053f84a7c9a': {
            id: 'f420483c-3701-4136-8fc0-4053f84a7c9a',
            sender: {
                name: '김지원', email: 'annie1004619@jmail.com', nickName: '지원',
                color: `bg-red-400`
            },
            date: '1626539353.09',
            body: {
                title: '000 관련 메일 드립니다!',
                content: '안녕하세요 0000 관련 메일 드립니다.어쩌구 저쩌구 어쩌구저쩌구'
            },
            receiver: [
               'hong@jmail.com'
            ]
        },
        'ea20eb99-76d3-4229-a370-423e438cc0f9': {
            id: 'ea20eb99-76d3-4229-a370-423e438cc0f9',
            sender: {
                name: '김지원', email: 'annie1004619@jmail.com', nickName: '지원',
                color: `bg-red-400`,
            },
            date: '1626539353.09',
            body: {
                title: '읽은 메일 입니다!',
                content: '이것은 읽은 메일~~.어쩌구 저쩌구 어쩌구저쩌구'
            },
            receiver: ['hong@jmail.com']
        },
    }
}

export const mailSlice = createSlice({
    name: 'mail',
    initialState,
    reducers: {
        addMail: (state, action) => {
            state.mailList = Object.assign(state.mailList, action.payload)
        },

    }

})

export const {
    addMail
} = mailSlice.actions

export default mailSlice.reducer