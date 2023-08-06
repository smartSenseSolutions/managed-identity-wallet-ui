export type UserDetails = {
  name: string;
  email: string;
  BPN: string;
  given_name: string;
};

export type UserState = {
  userDetails?: UserDetails;
  status: "init" | "success" | "failure" | "loading";
};

export const initialState: UserState = {
  status: "init",
};

export type Action =
  | { type: "FETCHING" }
  | { type: "FETCHED_FAILURE"; payload: { error: string } }
  | { type: "FETCHED_SUCCESS"; payload: UserDetails };

export type Dispatch = (action: Action) => void;

export const UserReducer = (state: UserState, action: Action): UserState => {
  switch (action.type) {
    case "FETCHING": {
      return { ...state, status: "loading" };
    }
    case "FETCHED_SUCCESS": {
      return { ...state, status: "success", userDetails: action.payload };
    }
    case "FETCHED_FAILURE": {
      return { ...state, status: "failure" };
    }
    default: {
      return state;
    }
  }
};
