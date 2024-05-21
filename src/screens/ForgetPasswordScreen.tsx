import React, { useState } from 'react'
import { View, Text, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';

type ForgotPasswordProps = {
    navigation: any;
};


const ForgetPasswordScreen: React.FC<ForgotPasswordProps> = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post('https://victorious-garters-pig.cyclic.app/forgot-password', { email });
            const { token } = response.data;
            Alert.alert('Success', 'Password reset instructions sent to your email.');
            navigation.navigate('ResetPasswordScreen', { token });
        } catch (error) {
            console.error('Forgot password failed:', error);
            Alert.alert('Error', 'Forgot password failed. Please try again.');
        }
    };

    return (
        <View>
            <Text>Enter your email to reset password</Text>
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
            <Button title="Reset Password" onPress={handleForgotPassword} />
        </View>
    )
}

export default ForgetPasswordScreen;