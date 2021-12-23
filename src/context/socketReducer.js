const SocketAuthReducer = (state, action) => {
  switch (action.type) {
    case "SOCKET_EVENT_START":
      return {
        socketEvent: null,
        isFetching: true,
        error: false,
      };
    case "SOCKET_EVENT_SUCCESS":
      return {
        socketEvent: action.payload,
        isFetching: false,
        error: false,
      };
    case "SOCKET_EVENT_FAILURE":
      return {
        socketEvent: null,
        isFetching: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default SocketAuthReducer;
