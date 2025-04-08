import React, { createContext, useReducer, useContext, Dispatch } from "react";

type State = {
  user: any | null;
};

const initialState: State = {
  user: null,
};

type Action = { type: "SET_USER"; payload: any};
