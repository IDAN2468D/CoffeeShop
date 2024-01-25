import React from 'react';
import { View } from 'react-native';

interface SeparatorProps {
    height: number,
    width: number,
}

const Separator: React.FC<SeparatorProps> = ({ width, height, ...extraProps }) => (
    <View style={{ width, height, ...extraProps }} />
)

Separator.defaultProps = {
    height: 0,
    width: 0,
};

export default Separator;