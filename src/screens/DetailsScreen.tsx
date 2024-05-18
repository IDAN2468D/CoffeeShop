import React from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import { TouchableWithoutFeedback } from 'react-native';
import { PaymentFooter } from '../components';
import useItemDetails from '../Hooks/useItemDetails';

const DetailsScreen = ({ navigation, route }: any) => {
    const {
        item,
        price,
        setPrice,
        fullDesc,
        setFullDesc,
        toggleFavourite,
        backHandler,
        addToCartHandler,
    } = useItemDetails(route, navigation);

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView contentContainerStyle={styles.ScrollViewFlex}>
                <ImageBackgroundInfo
                    EnableBackHandler={true}
                    imagelink_portrait={item.imagelink_portrait}
                    type={item.type}
                    id={item.id}
                    favourite={item.favourite}
                    name={item.name}
                    special_ingredient={item.special_ingredient}
                    ingredients={item.ingredients}
                    average_rating={item.average_rating}
                    ratings_count={item.ratings_count}
                    roasted={item.roasted}
                    BackHandler={backHandler}
                    ToggleFavourite={toggleFavourite}
                />
                <View style={styles.FooterInfoArea}>
                    <Text style={styles.InfoTitle}>Description</Text>
                    {fullDesc ? (
                        <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
                            <Text style={styles.DescriptionText}>{item.description}</Text>
                        </TouchableWithoutFeedback>
                    ) : (
                        <TouchableWithoutFeedback onPress={() => setFullDesc(prev => !prev)}>
                            <Text numberOfLines={3} style={styles.DescriptionText}>{item.description}</Text>
                        </TouchableWithoutFeedback>
                    )}
                    <Text style={styles.InfoTitle}>Size</Text>
                    <View style={styles.SizeOuterContainer}>
                        {item.prices.map((data: any) => (
                            <TouchableOpacity
                                key={data.size}
                                onPress={() => setPrice(data)}
                                style={[
                                    styles.SizeBox,
                                    {
                                        borderColor: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.primaryBlackHex,
                                    },
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize: item.type === 'bean' ? FONTSIZE.size_14 : FONTSIZE.size_16,
                                            color: data.size === price.size ? COLORS.primaryOrangeHex : COLORS.secondaryLightGreyHex,
                                        },
                                    ]}
                                >
                                    {data.size}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                <PaymentFooter
                    price={price}
                    buttonTitle='Add to Cart'
                    buttonPressHandler={addToCartHandler}
                />
            </ScrollView>
        </View>
    );
};

export default DetailsScreen;

const styles = StyleSheet.create({
    ScreenContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryBlackHex,
    },
    ScrollViewFlex: {
        flexGrow: 1,
        justifyContent: 'space-between',
    },
    FooterInfoArea: {
        padding: SPACING.space_20,
    },
    InfoTitle: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_10,
    },
    DescriptionText: {
        letterSpacing: 0.5,
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_14,
        color: COLORS.primaryWhiteHex,
        marginBottom: SPACING.space_30,
    },
    SizeOuterContainer: {
        flex: 1,
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',
        gap: SPACING.space_20,
    },
    SizeBox: {
        flex: 1,
        backgroundColor: COLORS.primaryDarkGreyHex,
        justifyContent: 'center',
        alignItems: 'center',
        height: SPACING.space_24 * 2,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
    },
});
