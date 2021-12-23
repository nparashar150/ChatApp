import { createContext, useReducer } from "react";
import SocketAuthReducer from "./socketReducer";

const INITIAL_SOCKET_STATE = {
    socketEvent: null,
    isFetching: false,
    error: null
  }

export const SocketAuthContext = createContext(INITIAL_SOCKET_STATE);
export const SocketAuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SocketAuthReducer, INITIAL_SOCKET_STATE);
  return (
    <SocketAuthContext.Provider
      value={{
        socketEvent: state.socketEvent,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </SocketAuthContext.Provider>
  )
}