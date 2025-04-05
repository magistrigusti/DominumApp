import React, { createContext, useContext, useReducer } from "react";

export interface UserState {
  address: string;
  avatar?: string;
  prestige: number;
  levelPrestige: number;
  prestigeProgress: number;
  technologies: string;
  food: number;
  wood: number;
  stone: number;
  iron: number;
  gold: number;
  doubloon: number;
  pearl: number;
}

type ResourceField = Exclude<keyof UserState, "address" | "avatar" | "technologies">;

type UserAction =
  | { type: "SET_USER"; payload: UserState }
  | { type: "ADD_RESOURCE"; resource: ResourceField; amount: number };

const initialState: UserState = {
  address: "",
  avatar: "",
  prestige: 0,
  levelPrestige: 0,
  prestigeProgress: 0,
  technologies: "",
  food: 0,
  wood: 0,
  stone: 0,
  iron: 0,
  gold: 0,
  doubloon: 0,
  pearl: 0,
};

function reducer(state: UserState, action: UserAction): UserState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, ...action.payload };
    case "ADD_RESOURCE":
      return {
        ...state,
        [action.resource]: (state[action.resource] as number) + action.amount,
      };
    default:
      return state;
  }
}

const UserContext = createContext<{
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
} | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be inside <UserProvider>");
  return context;
};
