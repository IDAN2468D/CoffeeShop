import React from 'react';
import { StyleSheet, Text, View, ImageProps, Image, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemProps {
    id: string,
    name: string,
    imagelink_square: ImageProps,
    special_ingredient: string,
    roasted: string,
    prices: any,
    type: string,
    incrementCartItemQuantity: any,
    decrementCartItemQuantity: any
}

const CartItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    roasted,
    prices,
    type,
    incrementCartItemQuantity,
    decrementCartItemQuantity
}) => {
    return (
        <View>
            {prices.length != 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemLinearGradient}
                >
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                            </View>
                            <View style={styles.CartItemRoastedContainer}>
                                <Text style={styles.CartItemRoastedText}>{roasted}</Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View key={index.toString()} style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text style={[styles.SizeText,
                                    {
                                        fontSize: type == "Bean"
                                            ? FONTSIZE.size_12
                                            : FONTSIZE.size_16
                                    }]}>{data.size}</Text>
                                </View>
                                <Text style={styles.SizeCurrency}>
                                    {data.currency}
                                    <Text style={styles.SizePrice}>{data.price}</Text>
                                </Text>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                    decrementCartItemQuantity(id, data.size)
                                }}>
                                    <CustomIcon name='minus' color={COLORS.primaryWhiteHex} size={FONTSIZE.size_10} />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>{data.quantity}</Text>
                                </View>
                                <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                    incrementCartItemQuantity(id, data.size)
                                }}>
                                    <CustomIcon name='add' color={COLORS.primaryWhiteHex} size={FONTSIZE.size_10} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                    style={styles.CartItemSingleLinearGradient}
                >
                    <View>
                        <Image source={imagelink_square} style={styles.CartItemSingleImage} />
                    </View>
                    <View style={styles.CartItemSingleInfo}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.CartItemSingleSizeViewContainer}>
                            <View style={styles.SizeBox}>
                                <Text
                                    style={[styles.SizeText,
                                    {
                                        fontSize: type == "Bean"
                                            ? FONTSIZE.size_12
                                            : FONTSIZE.size_16
                                    }]}
                                >{prices[0].size}</Text>
                            </View>
                            <Text style={styles.SizeCurrency}>
                                {prices[0].currency}
                                <Text style={styles.SizePrice}>{prices[0].price}</Text>
                            </Text>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                decrementCartItemQuantity(id, prices[0].size)
                            }}>
                                <CustomIcon name='minus' color={COLORS.primaryWhiteHex} size={FONTSIZE.size_10} />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>{prices[0].quantity}</Text>
                            </View>
                            <TouchableOpacity style={styles.CartItemIcon} onPress={() => {
                                incrementCartItemQuantity(id, prices[0].size)
                            }}>
                                <CustomIcon name='add' color={COLORS.primaryWhiteHex} size={FONTSIZE.size_10} />
                            </TouchableOpacity>
                        </View>

                    </View>
                </LinearGradient>
            )}
        </View>
    )
}

export default CartItem

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemRow: {
        flex: 1,
        flexDirection: "row-reverse",
        gap: SPACING.space_12,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: "space-between",
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: "row-reverse",
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    SizeBox: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 90,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.secondaryLightGreyHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        //fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: COLORS.primaryBlackHex,
        width: 60,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: "row-reverse",
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleInfo: {
        flex: 1,
        alignSelf: "stretch",
        justifyContent: "space-around",
    },
    CartItemSingleImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20
    },
    CartItemSingleSizeViewContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-evenly",
        marginVertical: SPACING.space_10,
        alignItems: 'center',
    }
})