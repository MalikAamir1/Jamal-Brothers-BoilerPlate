import React, {useEffect, useState} from 'react';
import {Alert, FlatList, Image, Pressable, View} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Text} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getDataFromAsync,
  removeDataToAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {useSelector} from 'react-redux';
import {BASE_URL} from '../../App/api';
import {useDispatch} from 'react-redux';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {
  getRequestWithCookie,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';

export const EditProfile = () => {
  const Navigation = useNavigation();
  // const dataFromRedux = useSelector(state => state.AuthReducer);
  const AuthReducer = useSelector(state => state.AuthReducer.userData);
  console.log(
    'AuthReducer?.user?.profile?.profile_pic: ',
    AuthReducer?.user?.profile?.profile_pic,
  );
  const [dataFromDb, setDataFromDb] = useState({});
  const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [valueAddress, onChangeAddress] = useState('');
  const [profileImage, onChangeProfileImage] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  const [localFullName, setLocalFullName] = useState('');
  const dispatch = useDispatch();

  console.log('data from redux on edit profile ', AuthReducer.user);


  useEffect(() => {
    if (AuthReducer.user) {
      setLoading(true);
      setLocalFullName(AuthReducer.user.profile.display_name);
      onChangePhoneNumber(AuthReducer.user.profile.telephone);
      onChangeAddress(AuthReducer.user.profile.street);
      setLoading(false);
    }
  }, [dataFromDb]);

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

  const rbSheetRef = useRef();

  const openGallery = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchImageLibrary(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        console.log('library Image');
        console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        // rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const openCamera = () => {
    let option = {
      include64: true,
      mediaType: 'photo',
    };
    launchCamera(option, res => {
      console.log(res);
      if (res.assets) {
        // setBanner(res.assets[0].uri);
        console.log('lCamera Img');
        console.log(res.assets[0].uri);
        onChangeProfileImage(res.assets[0].uri);
        UpploadProfileImage(res.assets[0].uri);
        // rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const validateFields = (
    localFullName,
    // valueEmail,
    valuePhoneNumber,
    valueAddress,
    // profileImage,
  ) => {
    // Validation for Full Name
    if (!localFullName.trim()) {
      onChangeError('Full Name is empty.');
      return false;
    }


    // Validation for Phone Number
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!valuePhoneNumber.trim()) {
      onChangeError('Phone Number is empty.');
      return false;
    } else if (!phoneNumberPattern.test(valuePhoneNumber)) {
      onChangeError('Invalid Phone Number format.');
      return false;
    }

    // Validation for Address
    if (!valueAddress.trim()) {
      onChangeError('Address is empty.');
      return false;
    }


    // All fields are valid
    return true;
  };

  function EditProfile() {
    const isValid = validateFields(
      localFullName,
      // valueEmail,
      valuePhoneNumber,
      valueAddress,
      // profileImage,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');

      var formdataProfile = new FormData();

      formdataProfile.append('email', AuthReducer.user.email);
      formdataProfile.append('display_name', localFullName);
      formdataProfile.append('telephone', valuePhoneNumber);
      formdataProfile.append('street', valueAddress);

      setLoading(true);

      postRequestWithTokenAndCookie(
        `${BASE_URL}/users/update-user-profile/`,
        formdataProfile,
        AuthReducer.token,
      )
        .then(result => {
          console.log('result', result);

          setLoading(true);

          getRequestWithCookie(
            `${BASE_URL}/users/user-profile/`,
            AuthReducer.token,
          )
            .then(result => {
              console.log(result);
              setLoading(false);

              setDataToAsync('user', JSON.stringify(result));

              getDataFromAsync('user')
                .then(res => {
                  dispatch(userDataFromAsyncStorage(JSON.parse(res)));

                })
                .catch(err => {
                  console.log('Error From getting from local storage: ', err);
                });
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
          setLoading(false);
          Navigation.goBack();
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
      onChangeError('');
    } else {
    }
  }

  function UpploadProfileImage(imgUrl) {
    console.log('imgUrl: ', imgUrl);

    var formdata = new FormData();
    formdata.append(`media_file`, {
      uri: imgUrl,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formdata.append('title', 'big data');
    formdata.append('is_active', 'true');
    formdata.append('file_type', 'Profile Pictures');
    formdata.append('description', 'profile pictures details ...');

    console.log('formdata: ', formdata);

    setLoading(true);

    postRequestWithTokenAndCookie(
      `${BASE_URL}/users/upload/media-file/`,
      formdata,
      AuthReducer.token,
    )
      .then(result => {
        console.log(result);

        setLoading(true);
        getRequestWithCookie(
          `${BASE_URL}/users/user-profile/`,
          AuthReducer.token,
        )
          .then(result => {
            console.log(result);
            setLoading(false);

            setDataToAsync('user', JSON.stringify(result));

            getDataFromAsync('user')
              .then(res => {
                dispatch(userDataFromAsyncStorage(JSON.parse(res)));
              })
              .catch(err => {
                console.log('Error From getting from local storage: ', err);
              });
          })
          .catch(error => {
            console.log('error', error);
            setLoading(false);
          });
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong please try again');
      });
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
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
              <SafeArea>
                <ScrollView>
                  <View style={{marginHorizontal: '5%', marginTop: '8%'}}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          alignSelf: 'center',
                          backgroundColor: '#EDCC45',
                          borderRadius: 10,
                        }}>
                        <Pressable
                          onPress={() => {
                            Navigation.navigate('Profile');
                          }}>
                          <Ionicons
                            name="chevron-back"
                            size={27}
                            color={'black'}
                          />
                        </Pressable>
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Heading
                          Heading={'Edit Profile'}
                          Fontsize={20}
                          color={COLORS.dark}
                          Fontweight={'bold'}
                          txtAlign={'center'}
                        />
                      </View>
                      <View style={{alignSelf: 'center'}}>
                        <Text> </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        alignSelf: 'center',
                        marginTop: '8%',
                        marginBottom: '8%',
                      }}>
                      <Image
                        source={{
                          uri: `https://jbpl.pythonanywhere.com${AuthReducer?.user?.profile?.profile_pic}`,
                        }}
                        style={{
                          width: 140,
                          height: 140,
                          borderWidth: 7,
                          borderColor: '#7D7D7D',
                          borderRadius: 75,
                        }}
                      />
                      <Pressable
                        onPress={() => {
                          console.log('log');
                          // rbSheetRef.open();
                          rbSheetRef.current.open();
                        }}
                        style={{
                          position: 'absolute',
                          alignSelf: 'flex-end',
                        }}>
                        <Image
                          source={require('../../Assets/Images/imgIcon.png')}
                          style={{
                            width: 40,
                            height: 40,
                            position: 'absolute',
                            alignSelf: 'flex-end',
                            marginTop: 100,
                          }}
                        />
                      </Pressable>
                    </View>

                    <View style={{marginVertical: '2%'}}>
                      <Input
                        title={'Full Name'}
                        urlImg={require('../../Assets/Images/profileBlack.png')}
                        placeholder={'Enter your name'}
                        value={localFullName}
                        onChangeText={setLocalFullName}
                      />
                      {errors.fullName && touched.fullName && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.fullName}
                        </Text>
                      )}
                    </View>

                    <View style={{marginVertical: '2%'}}>
                      <Input
                        title={'Email ID'}
                        urlImg={require('../../Assets/Images/emailIcon.png')}
                        // placeholder={'John Doe@domain.com'}
                        pass={false}
                        value={AuthReducer.user.email}
                        disabled={true}
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
                        title={'Phone Number'}
                        urlImg={require('../../Assets/Images/phoneIcon.png')}
                        placeholder={'(123) 456-7890'}
                        pass={false}
                        value={valuePhoneNumber}
                        onChangeText={onChangePhoneNumber}
                      />
                      {errors.phoneNumber && touched.phoneNumber && (
                        <Text
                          style={{
                            fontSize: 12,
                            color: 'red',
                            marginTop: 5,
                            marginBottom: 5,
                            marginLeft: 15,
                          }}>
                          {errors.phoneNumber}
                        </Text>
                      )}
                    </View>

                    <View style={{marginVertical: '2%'}}>
                      <Input
                        title={'Adress'}
                        urlImg={require('../../Assets/Images/mapIcon.png')}
                        // placeholder={'4010 Cliffside Drive'}
                        pass={false}
                        value={valueAddress}
                        onChangeText={onChangeAddress}
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

                    <View
                      style={{
                        justifyContent: 'center',
                        alignContent: 'center',
                        flexDirection: 'row',
                        marginVertical: '4%',
                      }}>
                      <ButtonComp
                        btnwidth={'97%'}
                        btnHeight={56}
                        btnText={'Save'}
                        justify={'center'}
                        align={'center'}
                        fontSize={16}
                        radius={15}
                        txtwidth={'100%'}
                        txtColor={COLORS.white}
                        color={COLORS.dark}
                        // bgcolor={'#BA7607'}
                        press={() => {
                          // Navigation.goBack();
                          EditProfile();
                        }}
                      />
                    </View>
                    <View>
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
                  </View>
                </ScrollView>
              </SafeArea>
            )}
          </Formik>

          <RBSheet
            ref={rbSheetRef}
            height={100}
            openDuration={250}
            customStyles={{
              container: {
                justifyContent: 'center',
                alignItems: 'center',
                borderTopEndRadius: 25,
                borderTopStartRadius: 25,
              },
            }}>
            <View
              style={{
                alignItems: 'flex-start',
                margin: '8%',
                flexDirection: 'row',
                justifyContent: 'flex-start',
              }}>
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: COLORS.primary,
                    borderRadius: 25,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={openCamera}>
                  <Icons name="photo-camera" color={'#fff'} size={30} />
                </Pressable>
                <InteractParagraph p={'Camera'} />
              </View>
              <View
                style={{
                  marginLeft: 40,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Pressable
                  style={{
                    width: 45,
                    height: 45,
                    backgroundColor: COLORS.primary,
                    borderRadius: 60,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onPress={openGallery}>
                  <Icons name="photo-library" color={'#fff'} size={30} />
                </Pressable>
                <InteractParagraph p={' Gallery'} />
              </View>
            </View>
          </RBSheet>
        </>
      )}
    </>
  );
};