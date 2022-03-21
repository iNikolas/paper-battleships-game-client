import React, {useEffect} from 'react';
import './App.css';
import RegisterPage from "./features/registerPage/RegisterPage";
import {useDispatch, useSelector} from "react-redux";
import Loader from "./common/Loader";
import {getRefreshTokenAsync} from "./common/userSlice";
import MainPage from "./features/mainPage/MainPage";

function App() {
    const dispatch = useDispatch()
    const selectUserStatus = useSelector(state => state.user.status)

    useEffect(() => dispatch(getRefreshTokenAsync()), [])

    if (selectUserStatus === 'uninitialized') return <Loader />
    if (selectUserStatus !== 'authorized') return <RegisterPage />

    return <MainPage />;
}

export default App;
