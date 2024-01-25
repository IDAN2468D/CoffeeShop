
export type UserData = {
    email: string;
    userName: string;
    password: string;
};

export type State = {
    email: string;
    password: string;
    userName: string;
    userExists: boolean,
    showPss: boolean;
    newUser?: UserData;
};

export type Action =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: "SET_USER_EXISTS"; payload: boolean }
    | { type: "SET_NEW_USER"; payload: UserData }


export const initialState: State = {
    email: "",
    password: "",
    userName: "",
    userExists: false,
    showPss: false,
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'SET_USERNAME':
            return { ...state, userName: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, showPss: !state.showPss };
        case "SET_USER_EXISTS":
            return { ...state, userExists: action.payload, };
        case "SET_NEW_USER":
            return { ...state, newUser: action.payload };
        default:
            return state;
    }
};