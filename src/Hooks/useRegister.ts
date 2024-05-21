import { useReducer } from 'react';
import axios from 'axios';

interface FormValues {
    email: string;
    userName: string;
    password: string;
}

interface State {
    email: string;
    userName: string;
    password: string;
    showPss: boolean;
    userExists: boolean | null;
}

const initialState: State = {
    email: '',
    userName: '',
    password: '',
    showPss: false,
    userExists: null,
};

type Action =
    | { type: 'SET_EMAIL'; payload: string }
    | { type: 'SET_USERNAME'; payload: string }
    | { type: 'SET_PASSWORD'; payload: string }
    | { type: 'TOGGLE_PASSWORD_VISIBILITY' }
    | { type: 'SET_USER_EXISTS'; payload: boolean }
    | { type: 'SET_NEW_USER'; payload: any };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'SET_EMAIL':
            return { ...state, email: action.payload };
        case 'SET_USERNAME':
            return { ...state, userName: action.payload };
        case 'SET_PASSWORD':
            return { ...state, password: action.payload };
        case 'TOGGLE_PASSWORD_VISIBILITY':
            return { ...state, showPss: !state.showPss };
        case 'SET_USER_EXISTS':
            return { ...state, userExists: action.payload };
        case 'SET_NEW_USER':
            return { ...state, ...initialState };
        default:
            return state;
    }
};

const useRegister = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const checkUserExistence = async (values: FormValues) => {
        try {
            const response = await axios.get<{ exists: boolean }>('https://victorious-garters-pig.cyclic.app/user-exist', {
                params: {
                    email: values.email,
                    name: values.userName,
                },
            });
            dispatch({ type: 'SET_USER_EXISTS', payload: response.data.exists });

            if (!response.data.exists) {
                const registerResponse = await axios.post<{ user: any }>('https://victorious-garters-pig.cyclic.app/register', {
                    email: values.email,
                    name: values.userName,
                    password: values.password,
                });

                dispatch({ type: 'SET_NEW_USER', payload: registerResponse.data.user });
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
            dispatch({ type: 'SET_USER_EXISTS', payload: false });
        }
    };

    return { state, dispatch, checkUserExistence };
};

export default useRegister;
