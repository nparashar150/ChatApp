export const SocketEventStart = (socketEvent) => ({
    type: "SOCKET_EVENT_START",
});

export const SocketEventSuccess = (socket) => ({
    type: "SOCKET_EVENT_SUCCESS",
    payload: socket,
});

export const SocketEventFailure = (error) => ({
    type: "SOCKET_EVENT_FAILURE",
    payload: error,
});