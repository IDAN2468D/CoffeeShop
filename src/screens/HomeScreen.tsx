import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import { CoffeeCard, HeaderBar } from '../components';
import CustomIcon from '../components/CustomIcon';
import LottieView from 'lottie-react-native';

const getCategoriesFromData = (data: any) => {
  let temp: any = {}
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift("All");
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if (category == "All") {
    return data
  } else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList;
  }
}


const HomeScreen = ({ navigation }: any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({
    index: 1,
    category: categories[1],
  });
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const ListRef: any = useRef<FlatList>()
  const tabBarHeight = useBottomTabBarHeight();
  const searchCoffee = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0
      })
      setCategoryIndex({ index: 0, category: categories[0] });
      setSortedCoffee([
        ...CoffeeList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  }

  const resetSearchCoffee = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0
    })
    setCategoryIndex({ index: 0, category: categories[0] });
    setSortedCoffee([...CoffeeList]);
    setSearchText('')
  }

  const CoffeeCartAddCart = ({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices, }: any) => {
    addToCart({ id, index, name, roasted, imagelink_square, special_ingredient, type, prices, });
    calculateCartPrice();
    ToastAndroid.showWithGravity(`${name} is Added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }


  //console.log("BeanList = ", BeanList)
  return (
    <View style={styles.SearchContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollViewFlex}>
        {/* App Header */}
        <HeaderBar />
        <Text style={styles.ScreenTitle}>Find the best{'\n'}coffee for you</Text>
        {/* Search Input */}
        <View style={styles.InputContainerComponent}>
          <TouchableOpacity onPress={() => {
            searchCoffee(searchText)
          }}
            activeOpacity={0.8}>
            <CustomIcon
              name='search'
              style={styles.InputIcon}
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
          <TextInput
            placeholder='Find Your Coffee...'
            value={searchText}
            onChangeText={text => { setSearchText(text), searchCoffee(searchText) }}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
          {searchText.length > 0 ? (
            <TouchableOpacity onPress={() => { resetSearchCoffee() }}>
              <CustomIcon
                style={styles.InputIcon}
                name='close'
                size={FONTSIZE.size_16}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
        {/* category Scroller */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}
        >
          {categories.map((data, index) => (
            <View style={styles.CategoryScrollViewContainer} key={index.toString()}>
              <TouchableOpacity style={styles.CategoryScrollViewItem} onPress={() => {
                ListRef?.current?.scrollToOffset({
                  animated: true,
                  offset: 0
                })
                setCategoryIndex({ index: index, category: categories[index] })
                setSortedCoffee([
                  ...getCoffeeList(categories[index], CoffeeList)
                ])
              }}>
                <Text style={[
                  styles.CategoryText,
                  categoryIndex.index == index
                    ? { color: COLORS.primaryOrangeHex }
                    : {}]}>{data}</Text>
                {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        {/* Coffee FlatList */}
        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
              <LottieView source={require('../lottie/coffeecup.json')} style={{ width: 100, height: 100, }} autoPlay loop />
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={() => {
                navigation.push("Details", { index: item.index, id: item.id, type: item.type })
              }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeeCartAddCart}
                />
              </TouchableOpacity>
            )
          }}
        />
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        {/* Beans FlatList */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainer, { marginBottom: tabBarHeight, }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.push("Details", { index: item.index, id: item.id, type: item.type }) }}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeeCartAddCart}
                />
              </TouchableOpacity>
            )
          }}
        />
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  SearchContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  scrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  InputContainerComponent: {
    flexDirection: "row-reverse",
    margin: SPACING.space_30,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,

  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  FlatListContainer: {
    gap: SPACING.space_15,
    paddingHorizontal: SPACING.space_30,
    paddingVertical: SPACING.space_20,
  },
  EmptyListContainer: {
    width: Dimensions.get("window").width - SPACING.space_20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 1.0,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_16,
    marginRight: SPACING.space_18,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
})