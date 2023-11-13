import { User } from 'firebase/auth';
import { useReducer } from 'react';

type UserAction = {
  type: string;
  payload: any;
};

type State = {
  resultsOnPage: number;
  pageNumber: number;
  pageUsers: User[];
};

const initialState: State = { resultsOnPage: 10, pageNumber: 1, pageUsers: [] };

const reducer = (state: State, action: UserAction): State => {
  switch (action.type) {
    case 'SET_PAGE_NUMBER':
      return {
        ...state,
        pageNumber: action.payload,
      };
    case 'SET_PAGE_USERS':
      return {
        ...state,
        pageUsers: action.payload,
      };
    default:
      return state;
  }
};

export const UserList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>list</p>
    </div>
  );
};
