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
            if (!newPassword) {
                Alert.alert('Error', 'New password cannot be empty.');
                return;
            }
            await axios.post(`https://rich-tan-xerus-hose.cyclic.app/reset-password/${token}`, { newPassword });
            Alert.alert('Success', 'Password reset successful.');
            navigation.navigate('Login'); // Assuming you want to navigate to a login screen
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