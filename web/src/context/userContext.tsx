import React, { ReactNode, createContext, useReducer } from 'react';
import { UserState } from '../model/app';

type State = UserState | null;

interface UserAction {
  type: 'SET_USER_STATE';
  payload: State;
}

type Actions = UserAction;

const reducer = (state: State, action: Actions) => {
  switch (action.type) {
    case 'SET_USER_STATE':
      return action.payload;
    default:
      return state;
  }
};

interface Props {
  children: ReactNode;
}

interface ContextValue {
  state: State;
  dispatch: React.Dispatch<Actions>;
}

const createUserContext = (reducer: React.Reducer<State, Actions>, initialState: State) => {
  const Context = createContext<ContextValue>({ state: initialState, dispatch: () => null });

  const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>;
  };

  return { Context, Provider };
};

const userContext = createUserContext(reducer, null);
export const { Context, Provider } = userContext;
export const useUserContext = () => React.useContext(userContext.Context);
