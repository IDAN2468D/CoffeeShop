import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import { ButtonOrderHistoryList, EmptyListAnimation, HeaderBar, OrderHistoryCard, PopUpAnimation } from '../components';


const OrderHistoryScreen = ({ navigation }: any) => {
    const OrderHistoryList = useStore((state: any) => state.OrderHistoryList);
    const tabBarHeight = useBottomTabBarHeight();
    const [showAnimated, setShowAnimated] = useState(false);
    const navigationHandler = ({ index, id, type }: any) => {
        navigation.push("Details", {
            index, id, type
        })
    }
    const buttonPressHandler = () => {
        setShowAnimated(true);
        setTimeout(() => {
            setShowAnimated(false)
        }, 2000)
    }


    console.log("History =", OrderHistoryList);
    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            {showAnimated ? (<PopUpAnimation style={styles.LottieAnimation} source={require("../lottie/download.json")} />) : (<></>)}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight, }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title='Order History' />
                        {OrderHistoryList.length == 0 ? (
                            <EmptyListAnimation title={"No Order History"} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {OrderHistoryList.map((data: any, index: any) => (
                                    <OrderHistoryCard
                                        key={index.toString()}
                                        navigationHandler={navigationHandler}
                                        CartList={data.CartList}
                                        CartListProps={data.CartListProps}
                                        OrderDate={data.OrderDate}
                                    />
                                ))}
                            </View>
                        )}
                    </View>
                    {OrderHistoryList.length > 0 ?
                        <ButtonOrderHistoryList Download='Download' onPress={() => { buttonPressHandler() }} />
                        : <></>
                    }
                </View>
            </ScrollView>
        </View>
    )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    LottieAnimation: {
        height: 250,
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
    },
    DownloadButton: {

    },
    DownloadText: {

    }
})