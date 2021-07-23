import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [
    {
      id: "1",
      name: "김지원",
      email: "annie1004619@jmail.com",
      nickName: "지원",
      color: "red",
      myMails: {
        myMails: {
          "fc275dcc-1ac1-4e06-a5a7-2b342b033e3c": {
            isRead: false,
            isStar: false,
            isImportant: false,
          },
          "f420483c-3701-4136-8fc0-4053f84a7c9a": {
            isRead: false,
            isStar: false,
            isImportant: false,
          },
          "ea20eb99-76d3-4229-a370-423e438cc0f9": {
            isRead: false,
            isStar: false,
            isImportant: false,
          },
        },
      },
      inbox: [],
      star: [],
      important: [],
      sent: [
        "fc275dcc-1ac1-4e06-a5a7-2b342b033e3c",
        "f420483c-3701-4136-8fc0-4053f84a7c9a",
        "ea20eb99-76d3-4229-a370-423e438cc0f9",
      ],
      trash: [],
    },
    {
      id: "2",
      name: "김쪼꼬",
      email: "choco@jmail.com",
      nickName: "쪼꼬",
      color: "green",
      myMails: {},
      inbox: [],
      star: [],
      important: [],
      sent: [],
      trash: [],
    },
    {
      id: "3",
      name: "홍길동",
      email: "hong@jmail.com",
      nickName: "길동",
      color: "blue",
      myMails: {
        "fc275dcc-1ac1-4e06-a5a7-2b342b033e3c": {
          isRead: false,
          isStar: true,
          isImportant: false,
        },
        "f420483c-3701-4136-8fc0-4053f84a7c9a": {
          isRead: false,
          isStar: false,
          isImportant: false,
        },
        "ea20eb99-76d3-4229-a370-423e438cc0f9": {
          isRead: true,
          isStar: false,
          isImportant: false,
        },
      },
      inbox: [
        "fc275dcc-1ac1-4e06-a5a7-2b342b033e3c",
        "f420483c-3701-4136-8fc0-4053f84a7c9a",
        "ea20eb99-76d3-4229-a370-423e438cc0f9",
      ],
      star: [
        {
          id: "fc275dcc-1ac1-4e06-a5a7-2b342b033e3c",
          item: ["fc275dcc-1ac1-4e06-a5a7-2b342b033e3c"],
        },
      ],
      important: [],
      sent: [],
      trash: [],
    },
  ],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addMyMails: (state, action) => {
      if (
        action.payload.threadId in state.users[action.payload.index].myMails
      ) {
        state.users[action.payload.index].myMails = Object.assign(
          state.users[action.payload.index].myMails,
          {
            [action.payload.threadId]: {
              ...state.users[action.payload.index].myMails[
                action.payload.threadId
              ],
              isRead: false,
            },
          }
        );
        return;
      }
      state.users[action.payload.index].myMails = Object.assign(
        state.users[action.payload.index].myMails,
        action.payload.item
      );
    },
    addInbox: (state, action) => {
      if (
        !state.users[action.payload.index].inbox.includes(action.payload.id)
      ) {
        state.users[action.payload.index].inbox = state.users[
          action.payload.index
        ].inbox.concat(action.payload.id);
      }
    },
    addSent: (state, action) => {
      if (state.users[action.payload.index].sent.includes(action.payload.id))
        return;
      state.users[action.payload.index].sent = state.users[
        action.payload.index
      ].sent.concat(action.payload.id);
    },
    addStar: (state, action) => {
      state.users[action.payload.userIndex].myMails[
        action.payload.id
      ].isStar = true;
      state.users[action.payload.userIndex].star = state.users[
        action.payload.userIndex
      ].star.concat(action.payload.item);
    },
    removeStar: (state, action) => {
      state.users[action.payload.userIndex].myMails[
        action.payload.id
      ].isStar = false;
      state.users[action.payload.userIndex].star.splice(
        action.payload.starIndex,
        1
      );
    },
    addImportant: (state, action) => {
      state.users[action.payload.userIndex].myMails[
        action.payload.id
      ].isImportant = true;
      state.users[action.payload.userIndex].important = state.users[
        action.payload.userIndex
      ].important.concat(action.payload.id);
    },
    removeImportant: (state, action) => {
      state.users[action.payload.userIndex].myMails[
        action.payload.id
      ].isImportant = false;
      state.users[action.payload.userIndex].important.splice(
        action.payload.importantIndex,
        1
      );
    },
    setIsRead: (state, action) => {
      state.users[action.payload.userIndex].myMails[
        action.payload.id
      ].isRead = true;
    },
  },
});

export const {
  addMyMails,
  addInbox,
  addSent,
  addStar,
  removeStar,
  addImportant,
  removeImportant,
  setIsRead,
} = usersSlice.actions;

export default usersSlice.reducer;
