function doSend(message, token, websocket) {
    if (message && message.length <= 1000) websocket.send(JSON.stringify({token, chatMessage: message.trim()}));
}

export default doSend