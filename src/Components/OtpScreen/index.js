import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  View,
  Modal,
  I18nManager,
  StyleSheet,
  Platform,
  SafeAreaView,
  Alert,
} from 'react-native';
import { ActivityIndicator, Button, Text } from 'react-native-paper';
import Heading from '../../Components/ReusableComponent/Heading';
import { useNavigation } from '@react-navigation/native';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { ScrollView } from 'react-native-gesture-handler';
import { OtpInput } from '../../Components/Otp';
import { Loader } from '../ReusableComponent/Loader';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch } from 'react-redux';
import { otpScreen } from '../../Store/Reducers/ScreenReducer';
import { postRequest } from '../../App/fetch';
import { BASE_URL } from '../../App/api';

export const OtpScreen = ({ route }) => {
  const Navigation = useNavigation();
  console.log('route params: ', route.params);
  // const screenName = route.params.screenName;

  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [screenName, setScreenName] = useState('');
  console.log('screenName: ', screenName);

  useEffect(() => {
    setScreenName(route.params.screenName);
  }, []);

  const otpValue = useRef('');

  const ResendOtp = () => {
    var formdata = new FormData();
    formdata.append('email', route.params.valueEmail);

    setLoading(true);
    postRequest(`${BASE_URL}/users/registration/resend-otp/`, formdata)
      .then(result => {
        console.log(result);
        if (result.success) {
          Alert.alert('Successfull', result.message);
        } else {
          Alert.alert('Error', 'Something went wrong please try again');
        }
        // Alert.alert('Successfull','Successfully send Otp')
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        Alert.alert('Error', 'Something went wrong please try again');
        setLoading(false);
      });
  };

  return (
    <>
      {loading || otpVerificationLoading ? (
        <Loader />
      ) : (
        <View style={{ flex: 1 }}>
          <ScrollView style={{ flex: 1, flexGrow: 1 }}>
            {/* Header */}
            <SafeAreaView style={{ flex: 1 }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginHorizontal: '2%',
                  justifyContent: 'space-between',
                  // marginTop: Platform.OS === 'ios' ? '10%' : 0,
                  //   margin: '8%',
                  //   marginBottom: 0,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: Platform.OS === 'ios' ? '6%' : '6%',
                    marginBottom: 0,
                  }}>
                  <Pressable
                    onPress={() => {
                      screenName == 'TermofServices'
                        ? Navigation.navigate('SignUp')
                        : Navigation.goBack();
                    }}>
                    <Image
                      source={require('../../Assets/Images/back.png')}
                      style={{
                        width: 18,
                        height: 15,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    />
                  </Pressable>
                </View>
                <View style={{ marginTop: '6%', height: 10 }}>
                  <LinearGradient
                    colors={['rgba(11, 16, 92, 1)', 'rgba(64, 123, 255, 1)']}
                    start={{ x: 2, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                      flex: 1,
                      //   marginLeft: 5,
                      //   justifyContent: 'left',
                      //   alignItems: 'left',
                      width: 76,
                      //   height: ,
                      borderRadius: 7,
                    }}></LinearGradient>
                </View>
                <View>
                  <Heading
                    Stylefont={'normal'}
                    Fontweight={'bold'}
                    Fontsize={18}
                    Heading={'                                                '}
                    color={'black'}
                  />
                </View>
              </View>

              {/* Center */}
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 50,
                }}>
                {/* <Image
                  source={require('../../Assets/Images/otpLock.png')}
                  style={{width: 100, height: 100}}
                  resizeMode={'contain'}
                /> */}
              </View>
              <View style={{ marginTop: '10%', marginHorizontal: '19%' }}>
                <Heading
                  Fontsize={24}
                  txtAlign={'center'}
                  Heading={'OTP'}
                  Fontweight={'bold'}
                  color={'rgba(11, 16, 92, 1)'}
                  mb={15}
                />
                <Heading
                  width={233}
                  Fontsize={15}
                  txtAlign={'center'}
                  Heading={
                    'We have sent you an email containing 6 digits verification code. Please enter the code to verify your identity'
                  }
                  // Fontweight={'bold'}
                  color={'rgba(123, 134, 158, 1)'}
                  lh={24}
                  mb={-20}
                />
              </View>

              <View style={styles.container}>
                <OtpInput
                  otpValue={otpValue}
                  screenName={screenName}
                  email={route.params.valueEmail}
                  password={route.params.valuePass}
                  setOtpVerificationLoading={setOtpVerificationLoading} // New prop
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: Platform.OS === 'ios' ? 280 : 270,
                  alignSelf: 'center',
                }}>
                <Heading
                  Fontsize={16}
                  as={'center'}
                  Heading={"Code didn't receive?"}
                  color={'rgba(28, 28, 28, 1)'}
                />
                <Pressable onPress={() => ResendOtp()} style={{ marginLeft: 3 }}>
                  <Heading
                    Fontsize={16}
                    // as={'center'}
                    Heading={'Resend'}
                    color={'#407BFF'}
                    Fontweight={'bold'}
                  />
                </Pressable>
              </View>
            </SafeAreaView>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
});
