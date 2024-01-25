import React from 'react';
import { StyleSheet, Text, View, ImageProps, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface OrderItemsCardProps {
    type: string,
    name: string,
    imagelink_square: ImageProps,
    special_ingredient: string,
    prices: any,
    ItemPrice: string,
}

const OrderItemsCard: React.FC<OrderItemsCardProps> = ({
    type,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    ItemPrice,
}) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
            style={styles.CartLinearGradient}
        >
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageInfoContainer}>
                    <Image source={imagelink_square} style={styles.Image} />
                    <View>
                        <Text style={styles.CartTitle}>{name}</Text>
                        <Text style={styles.CartSubtitle}>{special_ingredient}</Text>
                    </View>
                </View>
                <View>
                    <Text style={styles.CardCurrency}>
                        $ <Text style={styles.CardPrice}>{ItemPrice}</Text>
                    </Text>
                </View>
            </View>
            {prices.map((data: any, index: any) => (
                <View key={index.toString()} style={styles.CartTableRow}>
                    <View style={styles.CartTableRow}>
                        <View style={styles.SizeBoxLeft}>
                            <Text style={[styles.SizeText,
                            {
                                fontSize: type == "Bean"
                                    ? FONTSIZE.size_12
                                    : FONTSIZE.size_16
                            }]}>{data.size}</Text>
                        </View>
                        <View style={styles.PriceBoxRight}>
                            <Text style={styles.PriceCurrency}>
                                {data.currency}
                                <Text style={styles.Price}>{data.price}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.CartTableRow}>
                        <Text style={styles.CardQuantityPriceText}>
                            x<Text style={styles.Price}>{data.quantity}</Text>
                        </Text>
                        <Text style={styles.CardQuantityPriceText}>
                            $ {(data.quantity * data.price).toFixed(2).toString()}
                        </Text>
                    </View>
                </View>
            ))}
        </LinearGradient>
    )
}

export default OrderItemsCard

const styles = StyleSheet.create({
    CartLinearGradient: {
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardInfoContainer: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    CardImageInfoContainer: {
        flexDirection: "row-reverse",
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    Image: {
        height: 90,
        width: 90,
        borderRadius: BORDERRADIUS.radius_15,
    },
    CartTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    CartSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CardCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
    CartTableRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: "row-reverse",
        justifyContent: "space-between",
    },
    SizeBoxLeft: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopRightRadius: BORDERRADIUS.radius_10,
        borderBottomRightRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryGreyHex,
    },
    PriceBoxRight: {
        backgroundColor: COLORS.primaryBlackHex,
        height: 45,
        flex: 1,
        borderTopLeftRadius: BORDERRADIUS.radius_10,
        borderBottomLeftRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryGreyHex,
    },
    PriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    Price: {
        color: COLORS.primaryWhiteHex,
    },
    CardQuantityPriceText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightGreyHex,
    }
})