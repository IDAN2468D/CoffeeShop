import React, { FC, useReducer, useState } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions, DimensionValue, ScrollView } from 'react-native'
import CustomIcon_2 from '../components/CustomIcon_2';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import { ButtonContainer, Separator } from '../components';
import Display from '../theme/Display';
import { reducer, initialState } from '../useReducer/RegisterUseReducer'
import axios from 'axios';

interface FormValues {
    email: string;
    userName: string,
    password: string
}

type RootStackParamList = {
    Login: undefined;
    Register: undefined;
};

type RegisterScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

const RegisterScreen: FC<RegisterScreenProps> = ({ navigation }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const { email, password, userName, showPss } = state;


    const checkUserExistence = async (values: FormValues) => {
        try {
            const response = await axios.get<{ exists: boolean }>('https://rich-tan-xerus-hose.cyclic.app/user-exist', {
                params: {
                    email: values.email,
                    name: values.userName,
                },
            });
            dispatch({ type: "SET_USER_EXISTS", payload: response.data.exists });

            if (!response.data.exists) {
                const registerResponse = await axios.post<{ user: any }>('https://rich-tan-xerus-hose.cyclic.app/register', {
                    email: values.email,
                    name: values.userName,
                    password: values.password,
                });

                dispatch({ type: "SET_NEW_USER", payload: registerResponse.data.user });
            }
        } catch (error) {
            console.error('Error checking user existence:', error);
            dispatch({ type: "SET_USER_EXISTS", payload: false });
        }
    };

    return (
        <View style={styles.Container}>
            <StatusBar barStyle="light-content" backgroundColor={COLORS.primaryBlackHex} />
            <Image source={require("../assets/app_images/coffee.jpg")} style={styles.image} />
            <View style={styles.RegisterContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: 12,
                            color: COLORS.primaryWhiteHex,
                            fontFamily: FONTFAMILY.poppins_medium,
                            textAlign: "center"
                        }}>Enter your Email, choose username and password</Text>
                </View>
                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 10,
                }}>
                    <CustomIcon_2 name='email' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={email}
                        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
                        style={{ color: "gray", width: 300, fontSize: email ? 15 : 15 }}
                        placeholder='enter your Email'
                    />
                </View>
                {state.userExists !== null ? (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>Write your email</Text>
                ) : (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>{state.userExists ? 'Email exists!' : 'Email does not exist.'}</Text>
                )}

                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    gap: 5,
                    backgroundColor: "#D0D0D0",
                    paddingHorizontal: 10,
                    borderRadius: 5,
                    marginTop: 10,
                }}>
                    <CustomIcon_2 name='person' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={userName}
                        onChangeText={(text) => dispatch({ type: "SET_USERNAME", payload: text })}
                        style={{ color: "gray", width: 300, fontSize: email ? 15 : 15 }}
                        placeholder='enter your Name'
                    />
                </View>
                {state.userExists !== null ? (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>Write your name</Text>
                ) : (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>{state.userExists ? 'UserName exists!' : 'UserName does not exist.'}</Text>
                )}

                <View style={{
                    flexDirection: "row-reverse",
                    alignItems: 'center',
                    backgroundColor: "#D0D0D0",
                    borderRadius: 5,
                    paddingHorizontal: 15,
                    marginTop: 10,
                }}>
                    <CustomIcon_2 name='lock' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={password}
                        onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
                        secureTextEntry={!showPss}
                        style={{ color: "gray", width: 270, fontSize: email ? 15 : 15 }}
                        placeholder='enter your Password'
                    />
                    <TouchableOpacity onPress={() => dispatch({ type: 'TOGGLE_PASSWORD_VISIBILITY' })} >
                        <CustomIcon_2
                            name={showPss === false ? "visibility_off" : "remove_red_eye"}
                            size={24} color={COLORS.primaryWhiteHex}
                        />
                    </TouchableOpacity>
                </View>
                {state.userExists !== null ? (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>Write your password</Text>
                ) : (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>{state.userExists ? 'Password exists!' : 'Password does not exist.'}</Text>
                )}
                <Separator height={Display.setHeight(5)} width={0} />
                <ButtonContainer
                    title='Register'
                    onPress={async () => {
                        await checkUserExistence({ email, userName, password });
                        if (state.userExists === false) {
                            navigation.navigate("Login");
                        }
                    }}
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
                        You have an account?
                        <Text
                            style={{ color: COLORS.primaryWhiteHex }}
                            onPress={() => navigation.navigate('Login')}
                        > Sign In</Text>
                    </Text>
                </View>
            </View>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    image: {
        width: windowDimensions.width,
        height: screenDimensions.height / 3,
    },
    RegisterContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: COLORS.primaryBlackHex,
    }
})