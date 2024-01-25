import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

interface ButtonContainerProps {
    onPress: any,
    title: string,
    ContainerStyle: object,
    titleStyle: object,
}

const ButtonContainer: React.FC<ButtonContainerProps> = ({ onPress, title, ContainerStyle, titleStyle }) => {
    return (
        <TouchableOpacity style={ContainerStyle} onPress={onPress} activeOpacity={0.5}>
            <Text style={titleStyle}>{title}</Text>
        </TouchableOpacity>
    )
}

export default ButtonContainer;