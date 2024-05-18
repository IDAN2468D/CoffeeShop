import React, { useState } from 'react';
import { StyleSheet, Text, View, StatusBar, Button, Alert } from 'react-native';
import { COLORS } from '../theme/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ButtonContainer } from '../components';
import Modal from 'react-native-modal';

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
    const [isModalVisible, setModalVisible] = useState(false);
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

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
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
                onPress={toggleModal}
                title='LogOut'
            />

            <Modal isVisible={isModalVisible}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Shall we go out?</Text>
                    <Text style={styles.modalMessage}>Are you sure you want to log out?</Text>
                    <View style={styles.modalButtonContainer}>
                        <Button title="No" onPress={toggleModal} color={COLORS.primaryOrangeHex} />
                        <Button title="Yes" onPress={clearUserData} color={COLORS.primaryOrangeHex} />
                    </View>
                </View>
            </Modal>
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
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});
