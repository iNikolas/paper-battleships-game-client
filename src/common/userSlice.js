import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {BACKEND} from "./constants";
import {changeErrorState} from "./errorSlice";
import handleUpdateUser from "../features/mainPage/dashboard/handleUpdateUser";

const initialState = {
    user: null,
    status: 'uninitialized',
    token: null
};

export const authorizeUserAsync = createAsyncThunk(
    'user/authorize',
    async ({name, password, endPointString}, {dispatch}) => {
        const body = {
            data: {
                type: "users",
                attributes: {name, password},
            },
        };

        const response = await fetch(`${BACKEND}/users/${endPointString}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/vnd.api+json",
                Accept: "application/vnd.api+json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const userData = await response.json()
            return dispatch(updateUser({status: 'authorized', data: userData.data}))
        }

        const errorsInfo = await response.json()
        dispatch(changeErrorState(errorsInfo.errors[0]))

        throw new Error('No User')
    }, {
        condition: (userData, {getState}) => {
            const {user} = getState()
            if (user.status === 'loading') return false
        }
    }
);

export const getRefreshTokenAsync = createAsyncThunk(
    'user/token',
    async (stub, {dispatch}) => {
        const response = await fetch(`${BACKEND}/users/token`, {
            method: "POST",
            headers: {
                Accept: "application/vnd.api+json",
            },
            credentials: "include",
        });

        const goodResponse = response.ok;

        const userData = await response.json();
        const expiresInSec = userData.meta?.expiresInSec || 300;

        if (goodResponse) dispatch(updateUser({status: 'authorized', data: userData.data}));
        if (!goodResponse) dispatch(updateUser({status: 'unauthorized'}));

        setTimeout(() => {
            dispatch(getRefreshTokenAsync());
        }, expiresInSec * 1000 - 1000);
    })

export const logoutUserAsync = createAsyncThunk(
    'user/logout',
    async (stub, {dispatch}) => {
        dispatch(updateUser({status: 'unauthorized'}))
        await fetch(`${BACKEND}/users/logout`, {
            method: "DELETE",
            headers: {
                Accept: "application/vnd.api+json",
            },
            credentials: "include",
        });
    })

export const updateUserAsync = createAsyncThunk(
    'user/update',
    async ({id, newName, name, oldPassword, changePassword, newPassword}, {getState, dispatch}) => {
        const body = {
            data: {
                type: "users",
                id,
                attributes: {
                    newName: newName === name || !newName ? null : newName,
                    oldPassword,
                    newPassword: changePassword ? newPassword : null,
                },
            },
        };

        const result = await handleUpdateUser(body, getState().user.token);

        if (result.ok) return {status: "updated", newName: body.data.attributes.newName}

        const errorsInfo = await result.json()
        dispatch(changeErrorState(errorsInfo.errors[0]))

        return {status: "failed"}
    }
)

export const userSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        updateUser: (state, action) => {
            const status = action.payload.status
            state.status = status

            if (status === 'authorized') {
                const {token, attributes: user, id} = action.payload.data
                state.user = {...user, id}
                state.token = token
            }
            if (status !== 'authorized' && status !== 'loading') {
                state.user = null;
                state.token = null;
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorizeUserAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(authorizeUserAsync.rejected, (state) => {
                state.status = 'rejected';
            })
            .addCase(getRefreshTokenAsync.rejected, (state => {
                state.status = 'rejected'
            }))
            .addCase(updateUserAsync.fulfilled, ((state, action) => {
                const {status, newName} = action.payload
                if (status === 'updated' && newName) state.user = {...state.user, name: newName}
            }))
    }
});

export const {updateUser} = userSlice.actions;

export default userSlice.reducer;
