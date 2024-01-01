import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import TabBarNavigator from './src/navigators/TabBarNavigator'
import { CartScreen, DetailsScreen, PaymentScreen } from './src/screens/index'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='Tab'
          component={TabBarNavigator}
          options={{
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name='Details'
          component={DetailsScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name='Payment'
          component={PaymentScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})