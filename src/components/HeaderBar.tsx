import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { GradientBGIcon, ProfilePic } from '.';

interface HeaderBarPros {
    title?: string;
}

const HeaderBar: React.FC<HeaderBarPros> = ({ title }) => {
    return (
        <View style={styles.HeaderContainer}>
            <GradientBGIcon name='menu' color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} />
            <Text style={styles.HeaderText}>{title}</Text>
            <ProfilePic />
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: "row-reverse",
        alignItems: 'center',
        justifyContent: "space-between",
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex
    }
})