import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {ActivityIndicator, Text} from 'react-native-paper';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {GoogleAuth} from '../../Components/GoogleAuth';
import {FaceBookAuth} from '../../Components/FaceBook';
import {AudioRecording} from '../../Components/AudioRecording';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {postRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const [valueEmail, onChangeTextEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };

  const Navigation = useNavigation();

  function isValidEmail(valueEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(valueEmail);
  }

  function ForgetPassword() {
    if (valueEmail.trim() === '') {
      setErrorEmail('Email cannot be empty.');
    } else if (!isValidEmail(valueEmail)) {
      setErrorEmail('Enter valid email');
    } else {
      // onChangeError('');
      // Navigation.navigate('OtpScreen', {
      //   screenName: 'ForgotPassword',
      // });
      var formdataEmail = new FormData();
      formdataEmail.append('email', valueEmail);

      setLoading(true);

      postRequest(`${BASE_URL}/users/verify-email-exists/`, formdataEmail)
        .then(result => {
          // setLoading(false);
          console.log('Result: ', result.success);

          if (result.success) {
            setLoading(false);

            // const capitalizedEmail =
            //   valueEmail.charAt(0).toUpperCase() + valueEmail.slice(1);
            var formdata = new FormData();
            formdata.append('email', valueEmail);

            setLoading(true);
            postRequest(`${BASE_URL}/users/registration/resend-otp/`, formdata)
              .then(result => {
                console.log('result', result);
                setLoading(false);
                if (result.success) {
                  // const data = {
                  //   valueEmail: valueEmail,
                  // };
                  Navigation.navigate('OtpScreen', {
                    screenName: 'ForgotPassword',
                    valueEmail: valueEmail,
                  });
                } else {
                  Alert.alert('', 'Invalid Email address. please try again');
                }
              })
              .catch(error => {
                console.log('error', error);
                Alert.alert('Error', 'Something went wrong please try again');
                setLoading(false);
              });
          } else {
            setLoading(false);
            // setErrorEmail("Account Doesn't Exists");
            Alert.alert('', "Account Doesn't Exists");
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error.message);
          Alert.alert('', error);
          onChangeTextEmail('');
        });
      setErrorEmail('');
    }
  }

  return (
    <>
      <Formik
        initialValues={{email: '', password: ''}}
        validateOnMount={true}
        onSubmit={values => {
          simpleLogin(values);
        }}
        validationSchema={loginValidationScheme}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
          isValid,
        }) => (
          <>
            {loading ? (
              <Loader />
            ) : (
              //   <ImageBackground
              //     source={require('../../Assets/Images/bg.png')}
              //     resizeMode="cover"
              //     style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  marginTop: Platform.OS === 'ios' ? '10%' : 6,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: '8%',
                    marginBottom: 0,
                  }}>
                  <Pressable
                    onPress={() => {
                      Navigation.goBack();
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
                  {/* <View
                    style={{
                      width: '80%',
                      // alignItemss: 'center',
                      marginLeft: 20,
                      textAlign: 'center',
                    }}>
                    {error && (
                      <>
                        <InteractParagraph
                          p={error}
                          color={'red'}
                          txtAlign={'center'}
                        />
                      </>
                    )}
                  </View> */}
                </View>
                {/* <View
                  style={{
                    alignItems: 'center',
                    marginTop: 40,
                  }}>
                  <Image
                    source={require('../../Assets/Images/forgotPassword.png')}
                    style={{width: 100, height: 100}}
                    resizeMode={'contain'}
                  />
                </View> */}
                <View style={{alignItems: 'center'}}></View>
                <View
                  style={{
                    flexGrow: 1,
                    marginHorizontal: '5%',
                    padding: 15,
                    borderRadius: 15,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginHorizontal: 35,
                      marginVertical: 20,
                    }}>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 24,
                        color: 'rgba(11, 16, 92, 1)',
                      }}>
                      Forgot Password
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      width: '65%',
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        color: 'rgba(123, 134, 158, 1)',
                        textAlign: 'center',
                      }}>
                      Please enter your email to reset password
                    </Text>
                  </View>

                  <View>
                    <View style={{marginBottom: '1%', marginTop: '14%'}}>
                      <Input
                        title={'Email / Phone'}
                        urlImg={require('../../Assets/Images/emailIcon.png')}
                        placeholder={'email@domain.com'}
                        pass={false}
                        value={valueEmail}
                        onChangeText={onChangeTextEmail}
                        keyboardType={'email-address'}
                        autoCapitalize={'none'}
                      />
                      {!!errorEmail && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            // marginBottom: 15,
                            marginLeft: 37,
                          }}>
                          {'*' + errorEmail}
                        </Text>
                      )}
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '7%',
                    }}>
                    <ButtonComp
                      btnwidth={'97%'}
                      btnHeight={56}
                      btnText={'Continue'}
                      justify={'center'}
                      align={'center'}
                      fontSize={16}
                      radius={15}
                      txtwidth={'100%'}
                      press={() => {
                        ForgetPassword();
                      }}
                    />
                  </View>
                </View>
              </ScrollView>
              //   </ImageBackground>
            )}
          </>
        )}
      </Formik>
      {/* </SafeArea> */}
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 8,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
});
