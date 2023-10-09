import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Switch, Text} from 'react-native-paper';
// import COLORS from '../../Assets/Style/Color';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import Input from '../../Components/ReusableComponent/Input';
import * as yup from 'yup';

import {useNavigation} from '@react-navigation/native';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {BASE_URL} from '../../App/api';
import {postRequest} from '../../App/fetch';

export const Login = () => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);
  const [valueEmail, onChangeTextEmail] = useState('');
  const [valuePass, onChangeTextPass] = useState('');
  const [error, onChangeError] = useState('');
  const dispatch = useDispatch();

  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

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

  function isValidEmail(valueEmail) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(valueEmail);
  }

  function hasValidPassword(valuePass) {
    // Password must be at least 8 characters long
    if (valuePass.length < 8) {
      return false;
    }

    // Check for at least one uppercase letter
    if (!/[A-Z]/.test(valuePass)) {
      return false;
    }

    // Check for at least one lowercase letter
    if (!/[a-z]/.test(valuePass)) {
      return false;
    }

    // Check for at least one digit
    if (!/\d/.test(valuePass)) {
      return false;
    }

    // Check for at least one special character (non-alphanumeric)
    if (!/[^A-Za-z0-9]/.test(valuePass)) {
      return false;
    }

    return true;
  }

  function Login() {
    if (valueEmail.trim() === '') {
      onChangeError('Email cannot be empty.');
    } else if (!isValidEmail(valueEmail)) {
      onChangeError('Enter valid email');
    } else if (valuePass.trim() === '') {
      onChangeError('Password cannot be empty');
    } else if (!hasValidPassword(valuePass)) {
      onChangeError(
        'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.',
      );
    } else {
      console.log('valueEmail: ', valueEmail);
      console.log('valuePass: ', valuePass);
      console.log('Match');
      var formdataEmail = new FormData();
      formdataEmail.append('email', valueEmail);

      setLoading(true);

      postRequest(`${BASE_URL}/users/verify-email-exists/`, formdataEmail)
        .then(result => {
          // setLoading(false);
          console.log('Result: ', result.success);
          if (result.success) {
            setLoading(false);
            var formdata = new FormData();
            formdata.append('username', valueEmail);
            formdata.append('password', valuePass);

            setLoading(true);
            postRequest(`${BASE_URL}/users/login/token/`, formdata)
              .then(result => {
                console.log(result);
                setLoading(false);
                if (result?.non_field_errors) {
                  console.log('Not found');
                  Alert.alert('', 'Invalid Password');
                } else {
                  setDataToAsync('token', JSON.stringify(result.token));
                  setDataToAsync('user', JSON.stringify(result));

                  getDataFromAsync('user')
                    .then(res => {
                      dispatch(userDataFromAsyncStorage(JSON.parse(res)));
                      // console.log('res: ', res);
                    })
                    .catch(err => {
                      console.log(
                        'Error From getting from local storage: ',
                        err,
                      );
                    });

                  // Navigation.navigate('SimpleBottomTab', result);
                }
                // onChangeTextEmail('');
                // onChangeTextPass('');
              })
              .catch(error => {
                console.log('error', error);
                setLoading(false);
              });
          } else {
            setLoading(false);
            onChangeError('');
            Alert.alert('', 'Invalid Email');
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
          // onChangeTextEmail('');
        });
      // onChangeError('');
    }
  }

  const Navigation = useNavigation();

  return (
    <>
      {/* <SafeArea> */}
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
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {/* Add this line */}
                <View
                  style={{
                    alignItems: 'center',
                    marginTop: Platform.OS === 'ios' ? '25%' : 45,
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
                    marginHorizontal: '3%',
                    padding: 15,
                    borderRadius: 15,
                  }}>
                  <View>
                    <View style={{marginBottom: '5%', marginTop: '10%'}}>
                      <Input
                        title={'Email / Phone'}
                        urlImg={require('../../Assets/Images/emailIcon.png')}
                        placeholder={'email@domain.com'}
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

                    <View
                      style={{
                        marginHorizontal: -15,
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                      }}>
                      <Button
                        textColor={'#667080'}
                        onPress={() => Navigation.navigate('ForgotPassword')}>
                        <Text
                          style={{
                            color: '#1C1C1C',
                            fontSize: 14,
                            textAlign: 'right',
                          }}>
                          {' '}
                          Forgot Password?
                        </Text>
                      </Button>
                    </View>
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '5%',
                      marginLeft: '-2%',
                      // marginTop: '5%',
                    }}>
                    <ButtonComp
                      btnText={'Login'}
                      press={() => {
                        // Navigation.navigate('SimpleBottomTab');
                        Login();
                      }}
                    />
                  </View>
                  <View style={{marginTop: -5}}>
                    {error && (
                      <>
                        <InteractParagraph
                          txtAlign={'center'}
                          p={error}
                          mv={4}
                          color={'red'}
                        />
                      </>
                    )}
                  </View>
                  <View style={styles.container}>
                    <View style={styles.line2} />
                    <Text style={styles.text}>or</Text>
                    <View style={styles.line2} />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 30,
                      alignSelf: 'center',
                    }}>
                    <Pressable
                      onPress={() => {
                        // Navigation.navigate('SimpleBottomScreen');
                      }}>
                      <Image
                        source={require('../../Assets/Images/googleicon.png')}
                        style={{width: 30, height: 34, marginRight: '10%'}}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        // Navigation.navigate('SimpleBottomScreen');
                      }}>
                      <Image
                        source={require('../../Assets/Images/facebookicon.png')}
                        style={{width: 30, height: 35, marginRight: '12%'}}
                      />
                    </Pressable>
                    <Pressable
                      onPress={() => {
                        // Navigation.navigate('SimpleBottomScreen');
                      }}>
                      <Image
                        source={require('../../Assets/Images/appleicon.png')}
                        style={{width: 28, height: 30}}
                      />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: Platform.OS === 'ios' ? 150 : 110,
                      alignSelf: 'center',
                    }}>
                    <Heading
                      Fontsize={16}
                      as={'center'}
                      Heading={"Don't have an account?"}
                      color={'#1C1C1C'}
                    />
                    <Pressable
                      onPress={() => Navigation.navigate('SignUp')}
                      style={{marginLeft: 3}}>
                      <Heading
                        Fontsize={16}
                        // as={'center'}
                        Heading={'Sign Up'}
                        color={'#407BFF'}
                        Fontweight={'bold'}
                      />
                    </Pressable>
                  </View>
                </View>
              </ScrollView>
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: '8%',
    marginTop: 20,
  },
  line2: {
    // flex: 1,
    height: 1,
    width: '39%',
    backgroundColor: '#D0CBBB',
  },
  text: {
    marginHorizontal: 10,
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#514C4A',
  },
});
