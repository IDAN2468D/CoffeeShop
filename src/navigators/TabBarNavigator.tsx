import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { HomeScreen, FavoritesScreen, CartScreen, OrderHistoryScreen, SettingsScreen } from '../screens/index'
import CustomIcon from '../components/CustomIcon'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'
import CustomIcon_2 from '../components/CustomIcon_2'

const Tab = createBottomTabNavigator();

const TabBarNavigator = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarHideOnKeyboard: true,
                tabBarShowLabel: false,
                tabBarStyle: styles.tabBarStyle,
                tabBarBackground: () => (
                    <BlurView
                        overlayColor=''
                        blurAmount={15}
                        style={styles.BlurViewStyle}
                    />
                )
            }}>
            <Tab.Screen
                name='Settings'
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon_2 name='settings' size={30} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
            />

            <Tab.Screen
                name='History'
                component={OrderHistoryScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon name='bell' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
            />
            <Tab.Screen
                name='Favorite'
                component={FavoritesScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon name='like' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
            />
            <Tab.Screen
                name='Cart'
                component={CartScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon name='cart' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
            />
            <Tab.Screen
                name='Home'
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <CustomIcon name='home' size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

export default TabBarNavigator

const styles = StyleSheet.create({
    tabBarStyle: {
        height: 80,
        position: "absolute",
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth: 0,
        elevation: 0,
        borderTopColor: "transparent"
    },
    BlurViewStyle: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
})