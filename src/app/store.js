import { configureStore } from '@reduxjs/toolkit';
import errorReducer from '../common/errorSlice'
import userReducer from '../common/userSlice'
import chatBoxReducer from '../features/mainPage/mainScreen/chatBox/chatBoxSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    error: errorReducer,
    chatBox: chatBoxReducer
  },
});
