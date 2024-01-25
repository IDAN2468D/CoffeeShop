import React, { useState, useRef, useEffect, FC } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, FlatList, TouchableOpacity, ViewToken } from 'react-native';
import { OnboardingCard, Separator } from '../components';
import Display from '../theme/Display'
import { COLORS, FONTFAMILY } from '../theme/theme';
import CoffeeData from '../data/CoffeeData';

interface OnboardingScreenProps {
    id: string,
    name: string
    imagelink_square: any;
    description: string;
}

interface PaginationProps {
    index: number;
}

interface WelcomeScreenProps {
    navigation: any,
}



const selectedObjects = CoffeeData.slice(0, 3);

const pageStyle = (isActive: boolean) =>
    isActive ? styles.page : { ...styles.page, backgroundColor: COLORS.primaryGreyHex };

const Pagination: FC<PaginationProps> = ({ index }) => {
    return (
        <View style={styles.ContainerPages}>
            {[...Array(selectedObjects.length).keys()].map((_, i) =>
                i === index ? (
                    <View style={pageStyle(true)} key={i} />
                ) : (
                    <View style={pageStyle(false)} key={i} />
                ),
            )}
        </View>
    );
};

const OnboardingScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const [welcomeListIndex, setWelcomeListIndex] = useState<number>(0);
    const welcomeList = useRef<FlatList<OnboardingScreenProps>>(null);

    const onViewRef = useRef(({ changed }: { changed: any }) => {
        setWelcomeListIndex(changed[0].index);
    });
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

    const pageScroll = () => {
        welcomeList.current?.scrollToIndex({
            index: welcomeListIndex < 2 ? welcomeListIndex + 1 : welcomeListIndex,
        });
    };

    return (
        <View style={styles.container}>
            <FlatList
                ref={welcomeList}
                data={selectedObjects}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewRef.current}
                viewabilityConfig={viewConfigRef.current}
                renderItem={({ item }) => {
                    return (
                        <OnboardingCard {...item} />
                    )
                }}
            />
            <Separator height={Display.setHeight(8)} width={0} />
            <Pagination index={welcomeListIndex} />
            <Separator height={Display.setHeight(8)} width={0} />
            {welcomeListIndex === 2 ? (
                <TouchableOpacity
                    style={styles.gettingStartedButton}
                    activeOpacity={0.8}
                    onPress={() => { navigation.navigate("Login") }}
                >
                    <Text style={styles.gettingStartedButtonText}>Get Started</Text>
                </TouchableOpacity>
            ) : (
                <View style={styles.ButtonContainer}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.Button}
                        onPress={() => pageScroll()}
                    >
                        <Text style={styles.ButtonText}>NEXT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.SkipButton}
                        onPress={() => welcomeList.current?.scrollToEnd()}
                    >
                        <Text style={styles.ButtonText}>SKIP</Text>
                    </TouchableOpacity>
                </View>
            )}
            <Separator height={Display.setHeight(8)} width={0} />
        </View>
    )
}

export default OnboardingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS.primaryWhiteHex,
    },
    welcomeListContainer: {
        height: Display.setHeight(60),
    },
    ContainerPages: {
        flexDirection: "row",
    },
    page: {
        height: 8,
        width: 15,
        backgroundColor: COLORS.primaryOrangeHex,
        borderRadius: 32,
        marginHorizontal: 5,
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        width: Display.setWidth(90),
        alignItems: 'center',
    },
    ButtonText: {
        fontSize: 16,
        fontFamily: FONTFAMILY.poppins_semibold,
        lineHeight: 16 * 1.4
    },
    Button: {
        backgroundColor: COLORS.primaryOrangeHex,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    SkipButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    gettingStartedButton: {
        backgroundColor: COLORS.primaryOrangeHex,
        paddingVertical: 5,
        paddingHorizontal: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    gettingStartedButtonText: {
        fontSize: 20,
        color: COLORS.primaryWhiteHex,
        lineHeight: 20 * 1.4,
        fontFamily: FONTFAMILY.poppins_medium,
    },
});