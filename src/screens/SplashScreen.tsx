import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTFAMILY } from '../theme/theme';
import LottieView from 'lottie-react-native';


const SplashScreen = ({ navigation }: any) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate("Onboarding");
        }, 6000);
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: COLORS.primaryBlackHex, alignItems: 'center', justifyContent: 'center' }}>
            <LottieView source={require('../lottie/coffeecup.json')} autoPlay loop style={{ width: 200, height: 200, }} />
            <Text style={{ fontSize: 30, color: COLORS.primaryWhiteHex, fontFamily: FONTFAMILY.poppins_extrabold }}>CoffeeShop</Text>
        </View>
    )
}

export default SplashScreen;