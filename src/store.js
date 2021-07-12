import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_AUTHENTICATED": {
      return { ...state, user: { ...state.user, isAuthenticated: true } };
    }
    case "SET_UNAUTHENTICATED": {
      return { ...state, user: { ...state.user, isAuthenticated: false } };
    }
    default:
      return state;
  }
};

const initialState = {
  user: {
    isAuthenticated: false,
  },
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
