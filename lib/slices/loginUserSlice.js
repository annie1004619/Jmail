import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  index: "",
  user: {
    id: "",
    name: "",
    email: "",
    nickName: "",
    color: "",
  },
  myMails: {},
  inbox: [],
  star: [],
  important: [],
  sent: [],
  trash: [],
};

export const loginUserSlice = createSlice({
  name: "loginUser",
  initialState,
  reducers: {
    setLoginIndex: (state, action) => {
      state.index = action.payload;
    },
    setLoginUser: (state, action) => {
      state.user = action.payload;
    },
    setLoginMyMails: (state, action) => {
      state.myMails = action.payload;
    },
    setLoginInbox: (state, action) => {
      state.inbox = action.payload;
    },
    setLoginStar: (state, action) => {
      state.star = action.payload;
    },
    setLoginImportant: (state, action) => {
      state.important = action.payload;
    },
    setLoginSent: (state, action) => {
      state.sent = action.payload;
    },
    setLoginTrash: (state, action) => {
      state.trash = action.payload;
    },
    logout: (state) => {
      state.index = initialState.index;
      state.user = initialState.user;
      state.inbox = initialState.inbox;
      state.star = initialState.star;
      state.important = initialState.important;
      state.sent = initialState.sent;
      state.trash = initialState.trash;
    },
    addLoginStar: (state, action) => {
      state.myMails[action.payload.id].isStar = true;
      state.star = state.star.concat(action.payload.item);
    },
    removeLoginStar: (state, action) => {
      state.myMails[action.payload.id].isStar = false;
      state.star.splice(action.payload.starIndex, 1);
    },
    addLoginImportant: (state, action) => {
      state.myMails[action.payload].isImportant = true;
      state.important = state.important.concat(action.payload);
    },
    removeLoginImportant: (state, action) => {
      state.myMails[action.payload.id].isImportant = false;
      state.important.splice(action.payload.importantIndex, 1);
    },
    addLoginSent: (state, action) => {
      if (state.sent.includes(action.payload)) return;
      state.sent = state.sent.concat(action.payload);
    },
    addLoginMyMails: (state, action) => {
      if (action.payload.threadId in state.myMails) {
        state.myMails = Object.assign(state.myMails, {
          [action.payload.threadId]: {
            ...state.myMails[action.payload.threadId],
          },
        });
        return;
      }
      state.myMails = Object.assign(state.myMails, action.payload.item);
    },
    setLoginIsRead: (state, action) => {
      state.myMails[action.payload].isRead = true;
    },
  },
});

export const {
  setLoginIndex,
  setLoginUser,
  setLoginMyMails,
  setLoginInbox,
  setLoginStar,
  setLoginImportant,
  setLoginSent,
  setLoginTrash,

  logout,

  addLoginStar,
  removeLoginStar,
  addLoginImportant,
  removeLoginImportant,

  addLoginSent,
  addLoginMyMails,
  setLoginIsRead,
} = loginUserSlice.actions;

export default loginUserSlice.reducer;
