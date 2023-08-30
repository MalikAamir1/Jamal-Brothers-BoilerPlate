import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../Screens/Login';
import {SignUp} from '../../Screens/SignUp';

export default function StackNavigator({route, navigation}) {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <>
          <Stack.Screen name="login" component={Login} />
          <Stack.Screen name="SignUp" component={SignUp} />
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
