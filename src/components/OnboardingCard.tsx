import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import Display from '../theme/Display';

interface OnboardingCardProps {
    name: string,
    imagelink_square: any,
    description: string,
}

const OnboardingCard: React.FC<OnboardingCardProps> = ({ name, imagelink_square, description }) => {
    return (
        <View style={styles.container}>
            <Image source={imagelink_square} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.description}>{description}</Text>
        </View>
    )
}

export default OnboardingCard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Display.setWidth(100),
    },
    image: {
        height: Display.setHeight(30),
        width: Display.setWidth(60)
    },
    name: {
        fontSize: FONTSIZE.size_24,
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryBlackHex,
    },
    description: {
        fontSize: 14,
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryBlackHex,
        textAlign: "center",
        marginHorizontal: 20,
    }

})