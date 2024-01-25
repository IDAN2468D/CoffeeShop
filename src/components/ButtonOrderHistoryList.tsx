import { StyleSheet, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'

interface ButtonOrderHistoryListProps {
    Download: string,
    onPress: any
}

const ButtonOrderHistoryList: React.FC<ButtonOrderHistoryListProps> = ({ Download, onPress }) => {
    return (
        <TouchableOpacity activeOpacity={0.5} style={styles.DownloadButton} onPress={onPress}>
            <Text style={styles.DownloadText}>{Download}</Text>
        </TouchableOpacity>
    )
}

export default ButtonOrderHistoryList

const styles = StyleSheet.create({
    DownloadButton: {
        margin: SPACING.space_20,
        backgroundColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        justifyContent: 'center',
        height: SPACING.space_30 * 2,
        borderRadius: BORDERRADIUS.radius_20,
    },
    DownloadText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryWhiteHex,
    }
})