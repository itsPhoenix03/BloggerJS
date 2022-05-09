import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INTIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

export const Context = createContext(INTIAL_STATE);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INTIAL_STATE);
  const { user, isFetching, error } = state;

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <Context.Provider
      value={{
        user,
        isFetching,
        error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};
