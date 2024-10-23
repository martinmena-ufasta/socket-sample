export const MyWebSocket = (url, handleWebSocketMessage) => {
    console.log("Open socket connection")
    const webSocket = new WebSocket(url);
    webSocket.onmessage = (e) => {
        const {username, data} = JSON.parse(e.data)
        handleWebSocketMessage(username, data);
    };

    return webSocket;
};