import React, { FC } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import CustomIcon_2 from '../components/CustomIcon_2';
import { StackNavigationProp } from '@react-navigation/stack';
import { COLORS, FONTFAMILY, SPACING } from '../theme/theme';
import { ButtonContainer, Separator } from '../components';
import Display from '../theme/Display';
import useRegister from '../Hooks/useRegister'; // Adjust the path based on your project structure

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
    const { state, dispatch, checkUserExistence } = useRegister();
    const { email, password, userName, showPss } = state;

    const keyboard = useAnimatedKeyboard();
    const animatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: -keyboard.height.value }],
    }));

    return (
        <Animated.View style={[styles.Container, animatedStyles]}>
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
                <View style={styles.inputContainer}>
                    <CustomIcon_2 name='email' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={email}
                        onChangeText={(text) => dispatch({ type: "SET_EMAIL", payload: text })}
                        style={styles.textInput}
                        placeholder='Enter your Email'
                    />
                </View>
                {state.userExists !== null ? (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>Write your email</Text>
                ) : (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>{state.userExists ? 'Email exists!' : 'Email does not exist.'}</Text>
                )}

                <View style={styles.inputContainer}>
                    <CustomIcon_2 name='person' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={userName}
                        onChangeText={(text) => dispatch({ type: "SET_USERNAME", payload: text })}
                        style={styles.textInput}
                        placeholder='Enter your Name'
                    />
                </View>
                {state.userExists !== null ? (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>Write your name</Text>
                ) : (
                    <Text style={{ color: COLORS.primaryOrangeHex }}>{state.userExists ? 'UserName exists!' : 'UserName does not exist.'}</Text>
                )}

                <View style={styles.passwordContainer}>
                    <CustomIcon_2 name='lock' size={24} color={COLORS.primaryWhiteHex} />
                    <TextInput
                        value={password}
                        onChangeText={(text) => dispatch({ type: "SET_PASSWORD", payload: text })}
                        secureTextEntry={!showPss}
                        style={styles.textInput}
                        placeholder='Enter your Password'
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
                    ContainerStyle={styles.registerButton}
                    titleStyle={styles.registerButtonText}
                />
                <View style={{ marginTop: SPACING.space_15 }}>
                    <Text style={{ textAlign: "center", color: "gray" }}>
                        You have an account?
                        <Text style={{ color: COLORS.primaryWhiteHex }} onPress={() => navigation.navigate('Login')}> Sign In</Text>
                    </Text>
                </View>
            </View>
        </Animated.View>
    );
}

export default RegisterScreen;

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
    },
    inputContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        gap: 5,
        backgroundColor: "#D0D0D0",
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
    },
    passwordContainer: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        backgroundColor: "#D0D0D0",
        borderRadius: 5,
        paddingHorizontal: 15,
        marginTop: 10,
    },
    textInput: {
        color: "gray",
        width: 270,
        fontSize: 15,
    },
    registerButton: {
        paddingHorizontal: 30,
        paddingVertical: 20,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 20,
    },
    registerButtonText: {
        textAlign: "center",
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
    },
});
