import {createSlice } from '@reduxjs/toolkit';

const initialState = {
    online: [],
    messages: []
}

export const chatBoxSlice = createSlice({
    name: 'chatBox',
    initialState,
    reducers: {
        updateState: (state, action) => {
            const message = JSON.parse(action.payload)
            for (let key in message) {
                if (key === 'online') state[key] = message[key]
                if (key === 'messages') state[key] = message[key].map(chatEntry => JSON.parse(chatEntry))
            }
        }
    }
})

export const {updateState} = chatBoxSlice.actions;


export default chatBoxSlice.reducer;
