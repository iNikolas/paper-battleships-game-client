import onOpen from "./events/onOpen";
import onError from "./events/onError";
import onClose from "./events/onClose";
import onMessage from "./events/onMessage";

const initialize = ({connection: websocket, selectToken: token, setConnection: createWebsocket, updateChat}) => {
    websocket.onopen = (event) => onOpen(event, token)
    websocket.onerror = onError
    websocket.onclose = (event) => onClose(event, createWebsocket)
    websocket.onmessage = (message) => onMessage(message, updateChat)
}

export default initialize