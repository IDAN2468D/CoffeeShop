import React, { useEffect, useState } from 'react'
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import axios from 'axios';

type ResetPasswordProps = {
    route: any;
    navigation: any;
};

const ResetPasswordScreen: React.FC<ResetPasswordProps> = ({ route, navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const { token } = route.params || {};
    console.log('Received token:', token);


    const handleResetPassword = async () => {
        try {
            await axios.post(`https://jittery-sweatshirt-seal.cyclic.app/reset-password/${token}`, { newPassword });
            Alert.alert('Success', 'Password reset successful.');

            navigation.navigate('ResetPasswordScreen', { token: token });

        } catch (error) {
            console.error('Reset password failed:', error);
            Alert.alert('Error', 'Reset password failed. Please try again.');
        }
    };

    return (
        <View>
            <Text>Enter your new password</Text>
            <TextInput
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={(text) => setNewPassword(text)}
            />
            <Button title="Reset Password" onPress={handleResetPassword} />
        </View>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({})