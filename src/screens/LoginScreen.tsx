import React, { FC, useReducer, useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, DimensionValue } from 'react-native';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import Display from '../theme/Display';
import { ButtonContainer, Separator } from '../components';
import CustomIcon_2 from '../components/CustomIcon_2';
import { StackNavigationProp } from '@react-navigation/stack';
import { reducer, initialState } from '../useReducer/LoginUseReducer';
import axios, { AxiosError, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

type LoginScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
};

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const LoginScreen: FC<LoginScreenProps> = ({ navigation }) => {
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
            const loginResponse: AxiosResponse = await axios.post('http://192.168.1.190:4000/login', {
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

    return (
        <View style={styles.Container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryBlackHex} />
            <Image source={require("../assets/app_images/coffee.jpg")} style={styles.image} />
            <View style={styles.LoginContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: 12,
                            color: COLORS.primaryWhiteHex,
                            fontFamily: FONTFAMILY.poppins_medium,
                        }}>Log In to your Account</Text>
                </View>
                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 30,
                }}>
                    <CustomIcon_2 name='email' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={state.email}
                        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
                        style={{ color: "gray", width: 300, fontSize: state.email ? 15 : 15 }}
                        placeholder='enter your Email'
                    />
                </View>
                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    backgroundColor: "#D0D0D0",
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    marginTop: 30,
                }}>
                    <CustomIcon_2 name='lock' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={state.password}
                        onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
                        secureTextEntry={state.showPss}
                        style={{ color: "gray", width: 270, fontSize: state.email ? 15 : 15 }}
                        placeholder='enter your Password'
                    />
                    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })} >
                        <CustomIcon_2
                            name={state.showPss === false ? "visibility_off" : "remove_red_eye"}
                            size={24} color={COLORS.primaryWhiteHex}
                        />
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        flexDirection: "row-reverse",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginHorizontal: 5
                    }}
                >
                    <Text style={{ color: COLORS.primaryWhiteHex }}>Keep me logged in</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")} activeOpacity={0.8}>
                        <Text style={{ color: "#007FFF", fontWeight: '500', marginTop: 5, }}>Forget Password</Text>
                    </TouchableOpacity>
                </View>
                <Separator height={Display.setHeight(8)} width={0} />
                <ButtonContainer
                    title='Login'
                    onPress={() => loginUser({ email: state.email, password: state.password })}
                    ContainerStyle={{
                        paddingHorizontal: 30,
                        paddingVertical: 20,
                        backgroundColor: COLORS.primaryOrangeHex,
                        borderRadius: 20,
                    }}
                    titleStyle={{
                        textAlign: "center",
                        color: "white",
                        fontSize: 16,
                        fontWeight: 'bold',
                    }}
                />
                <View style={{ marginTop: SPACING.space_15, }}>
                    <Text style={{
                        textAlign: "center",
                        color: "gray"
                    }}>
                        Don't have an account?
                        <Text
                            style={{ color: COLORS.primaryWhiteHex, }}
                            onPress={() => navigation.navigate('Register')}
                        > Sign Up</Text>
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    image: {
        width: windowDimensions.width,
        height: screenDimensions.height / 3,
    },
    LoginContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.primaryBlackHex,
    }
});