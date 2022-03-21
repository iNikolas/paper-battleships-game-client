import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    data: null
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        changeErrorState: (state, action) => {
            state.data = action.payload
        }
    }
})

export const {changeErrorState} = errorSlice.actions;


export default errorSlice.reducer;
