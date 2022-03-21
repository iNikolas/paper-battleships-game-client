import React, {useEffect, useState} from "react"
import {WS_URI} from "../../../common/constants";
import initialize from "./webSocketApi/webSocketApi";
import {useDispatch, useSelector} from "react-redux";
import ChatBox from "./chatBox/ChatBox";
import {updateState} from "./chatBox/chatBoxSlice";
import doSend from "./webSocketApi/helpers/doSend";

const MainScreen = () => {
    const dispatch = useDispatch()
    const [connection, setConnection] = useState(new WebSocket(WS_URI))
    const selectToken = useSelector(state => state.user.token)
    const updateChat = (data) => dispatch(updateState(data))
    const handleMessageSend = (message) => doSend(message, selectToken, connection)

    useEffect(() => initialize({connection, selectToken, setConnection, updateChat}), [connection, selectToken])
    useEffect(() => () => {
        // window.location = '/'
    })

    return <ChatBox handleMessageSend={handleMessageSend}/>
}

export default MainScreen