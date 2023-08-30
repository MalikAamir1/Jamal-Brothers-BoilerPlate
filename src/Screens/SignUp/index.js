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
        onChangeError('Invalid email format');
      } else if (valuePass !== '') {
        if (valueConfirmPass !== '') {
          if (valuePass === valueConfirmPass) {
            if (hasValidPassword(valuePass)) {
              console.log('valueEmail: ', valueEmail);
              console.log('valuePass: ', valuePass);
              console.log('valueConfirmPass: ', valueConfirmPass);
              console.log('Match');

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
        onChangeError('Password should not be Empty');
      }
    } else {
      onChangeError('Email Id should not be Empty');
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
              // <ImageBackground
              //   source={require('../../Assets/Images/bg.png')}
              //   resizeMode="cover"
              //   style={{flex: 1}}>
              <ScrollView
                contentContainerStyle={{
                  flexGrow: 1,
                  marginTop: Platform.OS === 'ios' ? '10%' : 8,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    margin: '8%',
                  }}>
                  <Pressable
                    onPress={() => {
                      Navigation.goBack();
                    }}>
                    {/* <Image
                      source={require('../../Assets/Images/back.png')}
                      style={{
                        width: 30,
                        height: 30,
                        alignContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                      }}
                    /> */}
                  </Pressable>
                </View>

                <View style={{alignItems: 'center'}}>
                  {/* <Image
                    // source={require('../../Assets/Images/logIcon.png')}
                    source={require('../../Assets/Images/logicon2.png')}
                    style={{width: 150, height: 120}}
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
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginHorizontal: 35,
                      marginVertical: 10,
                    }}>
                    <Pressable
                      onPress={() => {
                        Navigation.navigate('login');
                      }}>
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: 20,
                          color: '#A8A8A8',
                        }}>
                        Sign In
                      </Text>
                    </Pressable>
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: 20,
                        color: '#BA7607',
                      }}>
                      Sign Up
                    </Text>
                  </View>

                  <View style={styles.line}>
                    <View
                      style={[
                        styles.colorSection,
                        {flex: 1, backgroundColor: '#A8A8A8'},
                      ]}
                    />
                    <View
                      style={[
                        styles.colorSection,
                        {flex: 1, backgroundColor: '#BA7607'},
                      ]}
                    />
                  </View>
                  {/* </Pressable> */}

                  <View>
                    <View style={{marginBottom: '2%', marginTop: '5%'}}>
                      <Input
                        title={'Email ID'}
                        // urlImg={require('../../Assets/Images/emailIcon.png')}
                        placeholder={'John Doe@domain.com'}
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

                    <View style={{marginVertical: '2%'}}>
                      <Input
                        title={'Password'}
                        // urlImg={require('../../Assets/Images/passIcon.png')}
                        placeholder={'************0'}
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

                    <View style={{marginVertical: '2%'}}>
                      <Input
                        title={'Confirm Password'}
                        // urlImg={require('../../Assets/Images/passIcon.png')}
                        placeholder={'************0'}
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

                  <View>
                    {error && (
                      <>
                        <InteractParagraph p={error} mv={4} color={'red'} />
                      </>
                    )}
                  </View>

                  <View
                    style={{
                      justifyContent: 'center',
                      alignContent: 'center',
                      flexDirection: 'row',
                      marginVertical: '4%',
                    }}>
                    <ButtonComp
                      // btnwidth={'97%'}
                      btnHeight={56}
                      btnText={'Sign Up'}
                      justify={'center'}
                      align={'center'}
                      fontSize={16}
                      radius={15}
                      txtwidth={'100%'}
                      // txtColor={COLORS.white}
                      press={() => {
                        // Navigation.navigate('TermCondition');
                        onPressSignUp();
                      }}
                    />
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 10,
                      alignContent: 'center',
                      alignSelf: 'center',
                      alignItems: 'center',
                    }}>
                    <Heading
                      Fontsize={15}
                      as={'center'}
                      Heading={'Already have an account?'}
                      // color={COLORS.dark}
                    />

                    <Button
                      textColor={'black'}
                      style={{marginLeft: -8}}
                      onPress={() => Navigation.navigate('login')}>
                      <Text
                        style={{
                          textDecorationLine: 'underline',
                          color: '#514C4A',
                          fontWeight: 'bold',
                        }}>
                        Sign In
                      </Text>
                    </Button>
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
