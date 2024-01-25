

export type State = {
    email: string;
    password: string;
    loggedInUser: string;
    showPss: boolean;
};

export type Action =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: 'SET_LOGGED_IN_USER'; payload: string }


export const initialState: State = {
    email: "",
    password: "",
    loggedInUser: "",
    showPss: false,
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, showPss: !state.showPss };
        case "SET_LOGGED_IN_USER":
            return { ...state, loggedInUser: action.payload };
        default:
            return state;
    }
};