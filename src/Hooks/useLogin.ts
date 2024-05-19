import { useReducer, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { reducer, initialState } from '../useReducer/LoginUseReducer';
import { StackNavigationProp } from '@react-navigation/stack';

interface FormValues {
    email: string;
    password: string;
}

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    ForgetPassword: undefined;
    Tab: undefined;
};

export const useLogin = (navigation: StackNavigationProp<RootStackParamList, 'Login'>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        checkStoredToken();
    }, []);

    const checkStoredToken = async () => {
        const authToken = await AsyncStorage.getItem('authToken');
        if (authToken) {
            navigation.navigate('Tab');
        }
    };

    const loginUser = async (values: FormValues) => {
        try {
            const loginResponse: AxiosResponse = await axios.post('https://rich-tan-xerus-hose.cyclic.app/login', {
                email: values.email,
                password: values.password,
            });
            const authToken = loginResponse.data.token;
            await AsyncStorage.setItem('authToken', authToken);
            dispatch({ type: "SET_LOGGED_IN_USER", payload: loginResponse.data });
            navigation.navigate("Tab");
            console.log('Login Response:', loginResponse.data);
        } catch (error) {
            if (axios.isAxiosError(error) && (error as AxiosError).response?.status === 401) {
                console.log('The login information provided is incorrect. Please check your email and password.');
            } else {
                console.error('Error when logging in:', error);
            }
        }
    };

    return {
        state,
        dispatch,
        loginUser
    };
};
