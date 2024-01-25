import { Dimensions, ScaledSize } from 'react-native';

interface ScreenDimensions extends ScaledSize {
    width: number;
    height: number;
}

const { width, height }: ScreenDimensions = Dimensions.get("window");

const setHeight = (h: number): number => (height / 100) * h;
const setWidth = (w: number): number => (width / 100) * w;

const DimensionUtils = { setHeight, setWidth };

export default DimensionUtils;
