import React from 'react';
import { StatusBar, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import { EmptyListAnimation, HeaderBar, PaymentFooter } from '../components';
import CartItem from '../components/CartItem';

const CartScreen = ({ navigation, route }: any) => {
    const CartList = useStore((state: any) => state.CartList);
    const CartPrice = useStore((state: any) => state.CartPrice);
    const incrementCartItemQuantity = useStore((state: any) => state.incrementCartItemQuantity);
    const decrementCartItemQuantity = useStore((state: any) => state.decrementCartItemQuantity);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const tabBarHeight = useBottomTabBarHeight();
    const buttonPressHandler = () => {
        navigation.push("Payment", { amount: CartPrice })
    }

    const incrementCartItemQuantityHandler = (id: string, size: string) => {
        incrementCartItemQuantity(id, size);
        calculateCartPrice();
    }

    const decrementCartItemQuantityHandler = (id: string, size: string) => {
        decrementCartItemQuantity(id, size);
        calculateCartPrice();
    }

    console.log("CartList = ", CartList.length);
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title='Cart' />
                        {CartList.length == 0 ? (
                            <EmptyListAnimation title={"Cart is Empty"} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {CartList.map((data: any) => (
                                    <TouchableOpacity key={data.id} onPress={() => {
                                        navigation.push("Details", {
                                            index: data.index,
                                            id: data.id,
                                            type: data.type
                                        })
                                    }}>
                                        <CartItem
                                            id={data.id}
                                            name={data.name}
                                            imagelink_square={data.imagelink_square}
                                            special_ingredient={data.special_ingredient}
                                            roasted={data.roasted}
                                            prices={data.prices}
                                            type={data.type}
                                            incrementCartItemQuantity={incrementCartItemQuantityHandler}
                                            decrementCartItemQuantity={decrementCartItemQuantityHandler}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                    {CartList.length != 0 ? (<PaymentFooter
                        buttonTitle='pay'
                        price={{ price: CartPrice, currency: "$" }}
                        buttonPressHandler={() => { buttonPressHandler() }}
                    />) : (
                        <></>
                    )}
                </View>
            </ScrollView>
        </View>
    )
}

export default CartScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
    },
    ScrollViewInnerView: {
        flex: 1,
        justifyContent: "space-between",
    },
    ItemContainer: {
        flex: 1,
    },
    ListItemContainer: {
        paddingHorizontal: SPACING.space_20,
        gap: SPACING.space_20,
    }
})