import React, {useEffect, useRef, useState} from "react"
import Form from 'react-bootstrap/Form'
import './ChatBox.css'
import {useSelector} from "react-redux";
import handleScroll from "../handleScroll";
import convertDateToString from "./convertDateToString";

const ChatBox = ({handleMessageSend}) => {
    const [message, setMessage] = useState('')
    const [autoScroll, setAutoScroll] = useState(true)
    const selectOnline = useSelector(state => state.chatBox.online)
    const selectMessages = useSelector(state => state.chatBox.messages)
    const selectName = useSelector(state => state.user.user.name)
    const [isHidden, setIsHidden] = useState(true)
    const viewStub = useRef()
    const timer = useRef()

    const messages = selectMessages.map(({message, name, date}) => {
        const time = convertDateToString(date)
        return <div key={name + date} className={`bubble ${name === selectName ? 'bubble-alt' : ''}`}>
            <p>{message}</p>
            <span className="chat-meta-stamp">{name}: {time}</span>
        </div>
    })

    const handleInputConfirm = (event) => {
        if (event.key === 'Enter') {
            handleMessageSend(message)
            setMessage('')
        }
    }

    const handleHideCheckbox = (timer) => {
        timer = setTimeout(() => setIsHidden(true), 300)
    }

    const handleShowCheckbox = (timer) => {
        clearTimeout(timer.current)
        setIsHidden(false)
    }

    const handleAutoScrollChange = () => {
        setAutoScroll(!autoScroll)
    }

    const handleInputChange = (event) => setMessage(event.target.value)

    const online = selectOnline.map(name => <span key={name}>{name}</span>)

    useEffect(() => {
        if (autoScroll) handleScroll(viewStub.current)
    }, [selectMessages, autoScroll])
    return <div className="chat-box">
        <div className="chat-header">
            Online: {' '}
            {online}
        </div>
        <div id='chat' className="chat">
            <div ref={viewStub} className="chat-container">
                {messages}
            </div>
        </div>
        <div className="chat-control">
            {!isHidden && <Form.Check onChange={handleAutoScrollChange} className='auto-scroll-checkbox' checked={autoScroll}
                         type="checkbox" label="Autoscroll"/>}
            <input onFocus={() => handleShowCheckbox(timer)} onBlur={() => handleHideCheckbox(timer)} value={message} onChange={handleInputChange} onKeyDown={handleInputConfirm}
                   maxLength='1000'
                   className="chat-input" type="text" placeholder="enter your message"/>
        </div>
    </div>
}

export default ChatBox