import React, {useEffect, useState} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Login} from '../../Screens/Login';
import {SignUp} from '../../Screens/SignUp';
import {useDispatch, useSelector} from 'react-redux';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {Splash} from '../../Screens/Splash';
import {Button, Image} from 'react-native';
import {Settings} from '../../Screens/Settings';
import SimpleBottomTab from '../SimpleBottomScreen';
import {Drawer} from '../../Screens/Drawer';
import {Notifications} from '../../Screens/Notifications';
import {PasswordChange} from '../../Screens/PasswordChange';
import {AboutApp} from '../../Screens/AboutApp';
import {PrivacyPolicy} from '../../Screens/PrivacyPolicy';
import {HelpAndSupport} from '../../Screens/HelpAndSupport';
import {TermsAndCondition} from '../../Screens/TermsAndCondition';
import {Profile} from '../../Screens/Profile';
import {EditProfile} from '../../Screens/EditProfile';
import {ForgotPassword} from '../../Screens/ForgetPassword';
import {OtpScreen} from '../../Components/OtpScreen';
import {ChangeForgetPassword} from '../../Screens/ChangeForgetPassword';
import {TermofServices} from '../../Screens/TermsOfServices';
import { ProfileCreate } from '../../Screens/ProfileCreate';

export default function StackNavigator({route, navigation}) {
  const Stack = createStackNavigator();
  const dispatch = useDispatch();

  const otpScreenBool = useSelector(state => state.ScreenReducer.userData);
  const userAuth = useSelector(state => state.AuthReducer);
  const [userData, setUserData] = useState({});
  // const [loader, setLoader] = useState(true);

  // React.useEffect(() => {
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // }, []);

  const getData = async () => {
    try {
      let value = await AsyncStorage.getItem('user').then(res => {
        return res;
      });
      return value;
    } catch (e) {
      console.log(e);
    }
  };

  React.useEffect(() => {
    (async () => {
      let value = getData().then(res => {
        // console.log('this is res in APp');
        console.log(res);
        let v = JSON.parse(res);

        console.log('v:', v);

        if (v?.user.id) {
          dispatch(userDataFromAsyncStorage(v));
          //  SplashScreen.hide();
        } else {
          //  SplashScreen.hide();
        }
      });
    })().catch(err => {
      console.error(err);
    });
  }, []);

  React.useEffect(() => {
    if (userAuth.userData?.user?.id) {
      setUserData(userAuth.userData);
    } else {
      setUserData(null);
    }
  }, [userAuth.userData]);

  useEffect(() => {
    console.log('userData:', userData);
    console.log('userAuth:', userAuth.userData.user);
  }, [userData]);
  useEffect(() => {
    console.log('otpScreenBool:', otpScreenBool);
  }, [otpScreenBool]);

  // if (loader) return <SplashScreenPage />;

  // function SplashScreenPage() {
  //   return (
  //     <NavigationContainer independent={true}>
  //       <Stack.Navigator screenOptions={{headerShown: false}}>
  //         <Stack.Group>
  //           <Stack.Screen name="splash" component={Splash} />
  //         </Stack.Group>
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   );
  // }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {userData == null ? (
          <>
            <Stack.Screen name="login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="TermofServices" component={TermofServices} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen
              name="ChangeForgetPassword"
              component={ChangeForgetPassword}
            />
          </>
        ) : otpScreenBool ? (
          <>
            <Stack.Screen name="ProfileCreate" component={ProfileCreate} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="SimpleBottomScreen"
              component={SimpleBottomTab}
            />

            <Stack.Screen name="Notifications" component={Notifications} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="Settings" component={Settings} />
            <Stack.Screen name="Drawer" component={Drawer} />
            <Stack.Screen name="PasswordChange" component={PasswordChange} />
            <Stack.Screen name="AboutApp" component={AboutApp} />
            <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
            <Stack.Screen name="HelpAndSupport" component={HelpAndSupport} />
            <Stack.Screen
              name="TermsAndCondition"
              component={TermsAndCondition}
            />
            {/* <Stack.Screen name="EditProfile" component={EditProfile} /> */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
