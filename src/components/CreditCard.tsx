import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CustomIcon from './CustomIcon'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface CreditCardProps {
    setPaymentMode: any,
    paymentMode: string,
    CreditCard: string,
    Card_Holder_Name: string,
    Robert_Evans: string,
    Expiry_Date: string,
    Date_Number: string
}

const CreditCard: React.FC<CreditCardProps> = ({
    setPaymentMode,
    paymentMode,
    CreditCard,
    Card_Holder_Name,
    Robert_Evans,
    Expiry_Date,
    Date_Number
}) => {
    return (
        <TouchableOpacity onPress={setPaymentMode}>
            <View style={[styles.CreditCardContainer, {
                borderColor: paymentMode == "Credit Card"
                    ? COLORS.primaryOrangeHex
                    : COLORS.primaryGreyHex,

            }]}>
                <Text style={styles.CreditCardTitle}>{CreditCard}</Text>
                <View style={styles.CreditCardBG}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
                        style={styles.LinearGradientStyle}
                    >
                        <View style={styles.CreditCardRow}>
                            <CustomIcon name='chip' size={FONTSIZE.size_20 * 2} color={COLORS.primaryOrangeHex} />
                            <CustomIcon name='visa' size={FONTSIZE.size_30 * 2} color={COLORS.primaryWhiteHex} />
                        </View>
                        <View style={styles.CreditCartNumberContainer}>
                            <Text style={styles.CreditCardNumber}>4652</Text>
                            <Text style={styles.CreditCardNumber}>4568</Text>
                            <Text style={styles.CreditCardNumber}>8595</Text>
                            <Text style={styles.CreditCardNumber}>9876</Text>
                        </View>
                        <View style={styles.CreditCardRow}>
                            <View style={styles.CreditCardNameContainer}>
                                <Text style={styles.CreditCardNameSubTitle}>{Card_Holder_Name}</Text>
                                <Text style={styles.CreditCardNameTitle}>{Robert_Evans}</Text>
                            </View>
                            <View style={styles.CreditCardDateContainer}>
                                <Text style={styles.CreditCardNameSubTitle}>{Expiry_Date}</Text>
                                <Text style={styles.CreditCardNameTitle}>{Date_Number}</Text>
                            </View>
                        </View>
                    </LinearGradient>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default CreditCard

const styles = StyleSheet.create({
    CreditCardContainer: {
        padding: SPACING.space_10,
        gap: SPACING.space_10,
        borderRadius: BORDERRADIUS.radius_15,
        borderWidth: 3,
    },
    CreditCardTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginLeft: SPACING.space_10,
    },
    CreditCardBG: {
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: BORDERRADIUS.radius_25,
    },
    LinearGradientStyle: {
        borderRadius: BORDERRADIUS.radius_25,
        gap: SPACING.space_36,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_10,
    },
    CreditCardRow: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        alignItems: 'center',
    },
    CreditCartNumberContainer: {
        flexDirection: "row-reverse",
        gap: SPACING.space_10,
        alignItems: 'center',
    },
    CreditCardNumber: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        letterSpacing: SPACING.space_4 + SPACING.space_2,
    },
    CreditCardNameContainer: {
        alignItems: "flex-end",

    },
    CreditCardDateContainer: {
        alignItems: "flex-start",
    },
    CreditCardNameSubTitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightGreyHex,
    },
    CreditCardNameTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    }

})