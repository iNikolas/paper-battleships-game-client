function onMessage({data: message}, updateChat) {
    if (typeof message === 'string') updateChat(message)
}

export default onMessage