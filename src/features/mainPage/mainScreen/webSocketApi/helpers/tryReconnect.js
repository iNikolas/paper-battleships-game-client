import {TIMER, WS_URI} from "../../../../../common/constants.js";

function tryReconnect(event, createWebsocket) {

    if (event.code !== 1000) {
        console.log('Trying to reconnect, wait...')
        if (!navigator.onLine) console.log("You are offline. Please connect to the Internet and try again.")

        TIMER.link = setTimeout(() => createWebsocket(new WebSocket(WS_URI)), 2000)
    }
}

export default tryReconnect