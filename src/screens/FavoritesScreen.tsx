import React from 'react';
import { StyleSheet, Text, View, StatusBar, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { EmptyListAnimation, FavoritesItemCard, HeaderBar } from '../components';
import { COLORS, SPACING } from '../theme/theme';

const FavoritesScreen = ({ navigation }: any) => {
    const FavoritesList = useStore((state: any) => state.FavoritesList);
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
    const tabBarHeight = useBottomTabBarHeight();
    const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
        favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id)
    }

    return (
        <View style={styles.ScreenContainer}>
            <StatusBar backgroundColor={COLORS.primaryBlackHex} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.ScrollViewFlex}
            >
                <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
                    <View style={styles.ItemContainer}>
                        <HeaderBar title='Favorites' />
                        {FavoritesList.length == 0 ? (
                            <EmptyListAnimation title={"No Favorites"} />
                        ) : (
                            <View style={styles.ListItemContainer}>
                                {FavoritesList.map((data: any) => (
                                    <TouchableOpacity
                                        key={data.id}
                                        onPress={() => {
                                            navigation.push("Details", {
                                                index: data.index,
                                                id: data.id,
                                                type: data.type
                                            })
                                        }}>
                                        <FavoritesItemCard
                                            id={data.id}
                                            imagelink_portrait={data.imagelink_portrait}
                                            name={data.name}
                                            special_ingredient={data.special_ingredient}
                                            type={data.type}
                                            ingredients={data.ingredients}
                                            average_rating={data.average_rating}
                                            ratings_count={data.ratings_count}
                                            roasted={data.roasted}
                                            description={data.description}
                                            favourite={data.favourite}
                                            BackHandler={BackHandler}
                                            ToggleFavouriteItem={ToggleFavourite}
                                        />
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default FavoritesScreen

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