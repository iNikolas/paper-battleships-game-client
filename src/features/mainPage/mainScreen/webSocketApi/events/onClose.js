import tryReconnect from "../helpers/tryReconnect";


function onClose(event, websocket) {

    console.log("DISCONNECTED");

    tryReconnect(event, websocket)
}

export default onClose