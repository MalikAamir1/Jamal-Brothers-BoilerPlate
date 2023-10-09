import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
// import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import {useNavigation} from '@react-navigation/native';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
// import {postRequest} from '../../App/fetch';
// import {BASE_URL} from '../../App/api';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {postRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const SignUp = () => {
  let loginValidationScheme = yup.object().shape({
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email address is required '),
    password: yup
      .string()
      .min(8, ({min}) => `Password must be at least ${min} characters`)
      .required('Password is required '),
  });

  const simpleLogin = value => {
    console.log('Values: ', value);
  };

  const Navigation = useNavigation();

  const [valueEmail, onChangeTextEmail] = useState('');
  const [valuePass, onChangeTextPass] = useState('');
  const [valueConfirmPass, onChangeTextConfirmPass] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);

  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function hasValidPassword(password) {
    // Password must be at least 8 characters long
    if (password.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(password)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(password)) {
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(password)) {
      return false;
    }

    // Check for at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(password)) {
      return false;
    }

    return true;
  }

  function onPressSignUp() {
    if (valueEmail !== '') {
      if (!isValidEmail(valueEmail)) {
        onChangeError('Enter valid email');
      } else if (valuePass !== '') {
        if (valueConfirmPass !== '') {
          if (valuePass === valueConfirmPass) {
            if (hasValidPassword(valuePass)) {
              console.log('valueEmail: ', valueEmail);
              console.log('valuePass: ', valuePass);
              console.log('valueConfirmPass: ', valueConfirmPass);
              console.log('Match');
              // Navigation.navigate('TermofServices');
              // onChangeError('');
              var formdataEmail = new FormData();
              formdataEmail.append('email', valueEmail);

              setLoading(true);

              //Email Check Start
              postRequest(
                `${BASE_URL}/users/verify-email-exists/`,
                formdataEmail,
              )
                .then(result => {
                  // setLoading(false);
                  console.log('Result: ', result.success);

                  if (result.success) {
                    Alert.alert('Account Exists', result.message);
                    setLoading(false);
                    onChangeTextEmail('');
                    onChangeTextPass('');
                    onChangeTextConfirmPass('');
                  } else {
                    setLoading(false);
                    const data = {
                      valueEmail: valueEmail,
                      valuePass: valuePass,
                      screenName: 'ProfileCreated',
                    };
                    onChangeTextEmail('');
                    onChangeTextPass('');
                    onChangeTextConfirmPass('');
                    console.log('Done');
                    Navigation.navigate('TermofServices', data);
                  }
                })
                .catch(error => {
                  setLoading(false);
                  console.log('error', error);
                  onChangeTextEmail('');
                  onChangeTextPass('');
                  onChangeTextConfirmPass('');
                });
              //Email Check End

              // Signup Backend End

              onChangeError('');
            } else {
              console.log('Not Match');
              onChangeError(
                'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
              );
            }
          } else {
            console.log('Not Match');
            onChangeError('Password and confirm Password do not match');
          }
        } else {
          onChangeError('Confirm Password should not be Empty');
        }
      } else {
        onChangeError('Password cannot be empty');
      }
    } else {
      onChangeError('Email cannot be empty.');
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
        {({handleChange, handleBlur, r, values, touched, errors, isValid}) => (
          <>
            {loading ? (
              <Loader />
            ) : (
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
                      Navigation.navigate('login');
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
                  <View
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
                  </View>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? 13 : 0,
                    width: 170,
                    height: 150,
                    backgroundColor: 'white',
                  }}>
                  {/* <Image
                    source={require('../../Assets/Images/logicon.png')}
                    style={{width: 170, height: 150}}
                    resizeMode={'contain'}
                  /> */}
                </View>

                <View
                  style={{
                    flexGrow: 1,
                    margin: '5%',
                    padding: 15,
                    borderRadius: 15,
                  }}>
                  <View>
                    <View style={{marginBottom: '5%', marginTop: '10%'}}>
                      <Input
                        title={'Email / Phone'}
                        urlImg={require('../../Assets/Images/emailIcon.png')}
                        placeholder={'Email@domain.com'}
                        pass={false}
                        value={valueEmail}
                        onChangeText={onChangeTextEmail}
                      />
                      {errors.email && touched.email && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.email}
                        </Text>
                      )}
                    </View>

                    <View style={{marginVertical: '3%'}}>
                      <Input
                        title={'Password'}
                        urlImg={require('../../Assets/Images/passIcon.png')}
                        placeholder={'***********'}
                        pass={'true'}
                        value={valuePass}
                        onChangeText={onChangeTextPass}
                      />
                      {errors.password && touched.password && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.password}
                        </Text>
                      )}
                    </View>

                    <View style={{marginVertical: '3%'}}>
                      <Input
                        title={'Confirm Password'}
                        urlImg={require('../../Assets/Images/passIcon.png')}
                        placeholder={'***********'}
                        pass={'true'}
                        value={valueConfirmPass}
                        onChangeText={onChangeTextConfirmPass}
                      />
                      {errors.confirmPassword && touched.confirmPassword && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.confirmPassword}
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
                      marginLeft: '-2%',
                      // marginTop: '5%',
                    }}>
                    <ButtonComp
                      btnText={'Sign Up'}
                      press={() => {
                        // Navigation.navigate('SimpleBottomTab');
                        onPressSignUp();
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Platform.OS === 'ios' ? 180 : 130,
                      alignSelf: 'center',
                    }}>
                    <Heading
                      Fontsize={16}
                      as={'center'}
                      Heading={'Already have an account?'}
                      color={'#1C1C1C'}
                    />
                    <Pressable
                      style={{marginLeft: 3}}
                      onPress={() => Navigation.navigate('login')}>
                      <Heading
                        Fontsize={16}
                        // as={'center'}
                        Heading={'Login'}
                        color={'#407BFF'}
                        Fontweight={'bold'}
                      />
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
              // </ImageBackground>
            )}
          </>
        )}
      </Formik>
    </>
  );
};

const styles = StyleSheet.create({
  line: {
    height: 4,
    flexDirection: 'row',
  },
  colorSection: {
    flex: 1,
  },
});
