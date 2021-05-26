import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const initialState = {};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export const Context = createContext(initialState);
export default Store;
