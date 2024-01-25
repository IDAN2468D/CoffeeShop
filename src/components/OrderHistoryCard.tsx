import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { OrderItemsCard } from '.';

interface OrderHistoryCardProps {
    navigationHandler: any,
    CartList: any,
    CartListProps: string,
    OrderDate: string,
}

const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
    navigationHandler,
    CartList,
    CartListProps,
    OrderDate,
}) => {
    return (
        <View style={styles.CartContainer}>
            <View style={styles.CartHeader}>
                <View>
                    <Text style={styles.HeaderTitle}>Order Time</Text>
                    <Text style={styles.HeaderSubTitle}>{OrderDate}</Text>
                </View>
                <View style={styles.PriceContainer}>
                    <Text style={styles.HeaderTitle}>Total Amount</Text>
                    <Text style={styles.HeaderPrice}>$ {CartListProps}</Text>
                </View>
            </View>
            <View style={styles.ListContainer}>
                {
                    CartList.map((data: any, index: any) => (
                        <TouchableOpacity key={index.toString() + data.id} onPress={() => {
                            navigationHandler({ index: data.index, id: data.id, type: data.type })
                        }}>
                            <OrderItemsCard
                                type={data.type}
                                name={data.name}
                                imagelink_square={data.imagelink_square}
                                special_ingredient={data.special_ingredient}
                                prices={data.prices}
                                ItemPrice={data.ItemPrice}
                            />
                        </TouchableOpacity>
                    ))
                }
            </View>
        </View>
    )
}

export default OrderHistoryCard

const styles = StyleSheet.create({
    CartContainer: {
        gap: SPACING.space_10,
    },
    CartHeader: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    HeaderTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
    },
    HeaderSubTitle: {
        fontFamily: FONTFAMILY.poppins_light,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
    },
    PriceContainer: {
        alignItems: "flex-start",
    },
    HeaderPrice: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    ListContainer: {
        gap: SPACING.space_20,
    }
})