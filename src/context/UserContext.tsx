import { createContext, useContext, useReducer } from "react";

// 🔧 Типы данных
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

type NumericUserFields = Exclude<
  keyof UserState,
  "address" | "avztar" | "technologies"
>;

export type UserAction =
  | { type: "SET_USER"; payload: UserState }
  | { type: "ADD_RESOURCE"; resource: NumericUserFields; amount: number };

// 🔧 Начальное состояние
const initialUserState: UserState = {
  address: "",
  avatar: "",
  technologies: "",
  prestige: 0,
  levelPrestige: 0,
  prestigeProgress: 0,
  food: 0,
  wood: 0,
  stone: 0,
  iron: 0,
  gold: 0,
  doubloon: 0,
  pearl: 0,
};

// 🔧 Редюсер
function userReducer(state: UserState, action: UserAction): UserState {
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

// 🔧 Контекст
interface UserContextType {
  state: UserState;
  dispatch: React.Dispatch<UserAction>;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialUserState);
  return <UserContext.Provider value={{ state, dispatch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
