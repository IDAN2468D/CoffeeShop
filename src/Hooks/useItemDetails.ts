import { useState, useEffect } from 'react';
import { useStore } from '../store/store';

const useItemDetails = (route: any, navigation: any) => {
    const { type, index } = route.params;
    const itemList = useStore((state: any) => (type === "Coffee" ? state.CoffeeList : state.BeanList));
    const item = itemList[index];
    const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
    const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
    const addToCart = useStore((state: any) => state.addToCart);
    const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
    const [price, setPrice] = useState(item.prices[0]);
    const [fullDesc, setFullDesc] = useState(false);

    const toggleFavourite = (favourite: boolean) => {
        favourite ? deleteFromFavoriteList(type, item.id) : addToFavoriteList(type, item.id);
    };

    const backHandler = () => {
        navigation.pop();
    };

    const addToCartHandler = () => {
        addToCart({ ...item, prices: [{ ...price, quantity: 1 }] });
        calculateCartPrice();
        navigation.navigate("Cart");
    };

    return {
        item,
        price,
        setPrice,
        fullDesc,
        setFullDesc,
        toggleFavourite,
        backHandler,
        addToCartHandler,
    };
};

export default useItemDetails;
