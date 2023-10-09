import React from 'react';
import {View, StatusBar, Platform, Image, ImageBackground} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text} from 'react-native-paper';
import {scale} from 'react-native-size-matters';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BottomScreen2 from '../../Screens/BottomScreen2';
import BottomScreen3 from '../../Screens/BottomScreen3';
import BottomScreen4 from '../../Screens/BottomScreen4';
import Home from '../../Screens/Home';

const Tab = createBottomTabNavigator();

export default function SimpleBottomTab() {
  return (
    <>
      {/* <StatusBar animated={true} backgroundColor="transparent" /> */}
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarHideOnKeyboard: true,
          tabBarStyle: {
            display: 'flex',
            position: 'absolute',
            bottom: 20,
            left: 15,
            right: 15,
            elevation: 5,
            backgroundColor: 'white',
            borderRadius: 30,
            height: 80,
            shadowColor: 'black',
            shadowOpacity: 0.2,
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowRadius: 4,
            elevation: 4, // Adjust the elevation value as needed
          },
          tabBarShowLabel: false,
          headerShown: false,
        })}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={
                  {
                    // top: Platform.OS === 'ios' ? 10 : 0,
                  }
                }>
                {focused ? (
                  <ImageBackground
                    source={require('../../Assets/Images/lightShadow.png')}
                    resizeMode={'contain'}
                    style={{
                      flex: 1,
                      width: 70,
                      alignContent: 'center',
                      alignItems: 'center',
                      marginBottom: Platform.OS === 'ios' ? 0 : 32,
                    }}>
                    <Image
                      source={require('../../Assets/Images/homeIconColor.png')}
                      style={{width: 28, height: 25, marginTop: 20}}
                      resizeMode={'contain'}
                    />
                    <Text
                      style={[
                        {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                        {color: '#BB7606'},
                      ]}>
                      Home
                    </Text>
                  </ImageBackground>
                ) : (
                  <>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../Assets/Images/homeIconLight.png')}
                        style={{
                          width: 28,
                          height: 25,
                          marginTop: Platform.OS === 'ios' ? 35 : 8,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={[
                          {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                          {color: '#A8A8A8'},
                        ]}>
                        Home
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="BottomScreen2"
          component={BottomScreen2}
          options={{
            tabBarIcon: ({focused}) => (
              <View style={{}}>
                {focused ? (
                  <ImageBackground
                    source={require('../../Assets/Images/lightShadow.png')}
                    resizeMode={'contain'}
                    style={{
                      flex: 1,
                      width: 70,
                      alignContent: 'center',
                      alignItems: 'center',
                      marginBottom: Platform.OS === 'ios' ? 0 : 32,
                    }}>
                    <Image
                      source={require('../../Assets/Images/bottomPlusIconColor.png')}
                      style={{width: 28, height: 25, marginTop: 20}}
                      resizeMode={'contain'}
                    />

                    <Text
                      style={[
                        {
                          fontSize: 12,
                          marginTop: 6,
                          fontWeight: 'bold',
                          // width: '100%',
                        },
                        {color: '#BB7606'},
                      ]}>
                      Screen 2
                    </Text>
                  </ImageBackground>
                ) : (
                  <>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../Assets/Images/bottomPlusIconLight.png')}
                        style={{
                          width: 28,
                          height: 25,
                          marginTop: Platform.OS === 'ios' ? 35 : 8,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={[
                          {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                          {color: '#A8A8A8'},
                        ]}>
                        Screen 2
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="BottomScreen3"
          component={BottomScreen3}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={
                  {
                    // top: Platform.OS === 'ios' ? 10 : 0,
                  }
                }>
                {focused ? (
                  <ImageBackground
                    source={require('../../Assets/Images/lightShadow.png')}
                    resizeMode={'contain'}
                    style={{
                      flex: 1,
                      width: 70,
                      alignContent: 'center',
                      alignItems: 'center',
                      marginBottom: Platform.OS === 'ios' ? 0 : 32,
                    }}>
                    <Image
                      source={require('../../Assets/Images/portfolioIcon.png')}
                      style={{width: 28, height: 25, marginTop: 20}}
                    />
                    <Text
                      style={[
                        {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                        {color: '#BB7606'},
                      ]}>
                      Screen 3
                    </Text>
                  </ImageBackground>
                ) : (
                  <>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../Assets/Images/portfolioIconLight.png')}
                        style={{
                          width: 28,
                          height: 25,
                          marginTop: Platform.OS === 'ios' ? 35 : 8,
                        }}
                      />
                      <Text
                        style={[
                          {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                          {color: '#A8A8A8'},
                        ]}>
                        Screen 3
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="BottomScreen4"
          component={BottomScreen4}
          options={{
            tabBarIcon: ({focused}) => (
              <View>
                {focused ? (
                  <ImageBackground
                    source={require('../../Assets/Images/lightShadow.png')}
                    resizeMode={'contain'}
                    style={{
                      flex: 1,
                      width: 70,
                      alignContent: 'center',
                      alignItems: 'center',
                      marginBottom: Platform.OS === 'ios' ? 0 : 32,
                    }}>
                    <Image
                      source={require('../../Assets/Images/shopIconCOlor.png')}
                      style={{width: 28, height: 25, marginTop: 20}}
                    />
                    <Text
                      style={[
                        {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                        {color: '#BB7606'},
                      ]}>
                      Screen 4
                    </Text>
                  </ImageBackground>
                ) : (
                  <>
                    <View style={{alignItems: 'center'}}>
                      <Image
                        source={require('../../Assets/Images/shopIcon.png')}
                        style={{
                          width: 28,
                          height: 25,
                          marginTop: Platform.OS === 'ios' ? 35 : 8,
                        }}
                      />
                      <Text
                        style={[
                          {fontSize: 12, marginTop: 4, fontWeight: 'bold'},
                          {color: '#A8A8A8'},
                        ]}>
                        Screen 4
                      </Text>
                    </View>
                  </>
                )}
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
