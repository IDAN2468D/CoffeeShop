import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { COLORS, SPACING } from '../theme/theme';
import { CreditCard, HeaderContainer, PaymentFooter, PaymentMethod, PopUpAnimation } from '../components';
import { PaymentList } from '../data/PaymentList'
import { useStore } from '../store/store';


const PaymentScreen = ({ navigation, route }: any) => {
    const [paymentMode, setPaymentMode] = useState("credit Card");
    const [showAnimated, setShowAnimated] = useState(false);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const addToOrderHistoryListFromCart = useStore((state: any) => state.addToOrderHistoryListFromCart);


    const buttonPressHandler = () => {
        setShowAnimated(true);
        addToOrderHistoryListFromCart();
        calculateCartPrice();
        setTimeout(() => {
            setShowAnimated(false)
            navigation.navigate("History");
        }, 2000)
    }
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            {showAnimated ? (<PopUpAnimation style={styles.LottieAnimation} source={require("../lottie/successful.json")} />) : (<></>)}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <HeaderContainer Payments='Payments' nav={() => { navigation.pop() }} />
                <View style={styles.PaymentOptionsContainer}>
                    <CreditCard
                        setPaymentMode={() => setPaymentMode("Credit Card")}
                        paymentMode={paymentMode}
                        CreditCard="CreditCard"
                        Card_Holder_Name="Card Holder Name"
                        Robert_Evans="Robert Evans"
                        Expiry_Date="Expiry Date"
                        Date_Number="02/30"
                    />
                    {PaymentList.map((data) => (
                        <TouchableOpacity key={data.name} onPress={() => {
                            setPaymentMode(data.name)
                        }}>
                            <PaymentMethod
                                paymentMode={paymentMode}
                                name={data.name}
                                icon={data.icon}
                                isIcon={data.isIcon}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <PaymentFooter
                buttonTitle={`Pay with ${paymentMode}`}
                price={{ price: route.params.amount, currency: '$' }}
                buttonPressHandler={buttonPressHandler}
            />
        </View>
    )
}

export default PaymentScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    PaymentOptionsContainer: {
        padding: SPACING.space_15,
        gap: SPACING.space_15,
    },
    LottieAnimation: {
        flex: 1,
    }
})