import { StyleSheet, Text, View, StatusBar, Button } from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonContainer } from '../components';

type RootStackParamList = {
    SettingsScreen: undefined;
    Login: undefined;
};

type SettingsScreenNavigationProp = StackNavigationProp<
    RootStackParamList,
    'SettingsScreen'
>;

const SettingsScreen: React.FC = () => {
    const [exampleData, setExampleData] = useState('');
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const clearUserData = async () => {
        try {
            await AsyncStorage.removeItem('authToken');
            setExampleData('');
            navigation.navigate('Login');
        } catch (error) {
            console.error('Error clearing data from AsyncStorage:', error);
        }
    };

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />

            <ButtonContainer
                ContainerStyle={{
                    marginHorizontal: 30,
                    paddingVertical: 20,
                    backgroundColor: COLORS.primaryOrangeHex,
                    borderRadius: 20,
                }}
                titleStyle={{
                    textAlign: "center"
                }}
                onPress={clearUserData}
                title='Logout'
            />
        </View>
    );
};

export default SettingsScreen;

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: COLORS.primaryBlackHex,
    },
});
