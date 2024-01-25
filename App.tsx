import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabBarNavigator from './src/navigators/TabBarNavigator';
import { DetailsScreen, ForgetPasswordScreen, LoginScreen, OnboardingScreen, PaymentScreen, RegisterScreen, ResetPasswordScreen } from './src/screens/index';
import SplashScreen from './src/screens/SplashScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Splash'>
        <Stack.Screen
          name='Splash'
          component={SplashScreen}
        />
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
        />
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
        <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name='ForgetPassword'
          component={ForgetPasswordScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
        <Stack.Screen
          name='ResetPasswordScreen'
          component={ResetPasswordScreen}
          options={{
            animation: "fade_from_bottom"
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;