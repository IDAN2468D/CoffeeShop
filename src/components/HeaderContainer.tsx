import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import React from 'react'
import { GradientBGIcon } from '.'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';

interface HeaderContainerProps {
    Payments: string;
    nav: any;
}

const HeaderContainer: React.FC<HeaderContainerProps> = ({ Payments, nav }) => {
    return (
        <View style={styles.HeaderContainer}>
            <TouchableOpacity onPress={nav}>
                <GradientBGIcon
                    name='left'
                    color={COLORS.primaryLightGreyHex}
                    size={FONTSIZE.size_16}
                />
            </TouchableOpacity>
            <Text style={styles.HeaderText}>{Payments}</Text>
            <View style={styles.EmptyView} />
        </View>

    )
}

export default HeaderContainer

const styles = StyleSheet.create({
    HeaderContainer: {
        paddingHorizontal: SPACING.space_24,
        paddingVertical: SPACING.space_15,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HeaderText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryWhiteHex,
    },
    EmptyView: {
        height: SPACING.space_36,
        width: SPACING.space_36,
    },

})