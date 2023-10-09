import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
  Platform,
  Alert,
} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ScrollView} from 'react-native-gesture-handler';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import {Formik} from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icons from 'react-native-vector-icons/MaterialIcons';
import InteractParagraph from '../../Components/ReusableComponent/Paragraph';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '../../App/api';
import {useDispatch, useSelector} from 'react-redux';
import {
  getDataFromAsync,
  setDataToAsync,
} from '../../Utils/getAndSetAsyncStorage';
import {userDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {removeOtpScreen} from '../../Store/Reducers/ScreenReducer';
import {Loader} from '../../Components/ReusableComponent/Loader';
import {
  getRequestWithCookie,
  postRequestWithTokenAndCookie,
} from '../../App/fetch';

export const ProfileCreate = ({route}) => {
  const Navigation = useNavigation();
  const dispatch = useDispatch();
  const userAuth = useSelector(state => state.AuthReducer);

  const [modalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState({});
  const [valueFullName, onChangeFullName] = useState('');
  const [valueEmail, onChangeEmail] = useState('');
  const [valuePhoneNumber, onChangePhoneNumber] = useState('');
  const [valueAddress, onChangeAddress] = useState('');
  const [profileImage, onChangeProfileImage] = useState('');
  const [error, onChangeError] = useState('');
  const [loading, setLoading] = useState(false);
  console.log(profileImage);

  const AuthReducer = useSelector(state => state.AuthReducer);

  console.log('AuthReducer.userData: ', AuthReducer.userData);

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

  React.useEffect(() => {
    if (userAuth.userData?.user?.id) {
      setUserData(userAuth.userData.user.email);
    } else {
      setUserData(null);
    }
  }, [userAuth.userData]);

  useEffect(() => {
    console.log('userData in profile create screen:', userData);
  }, [userData]);

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
        rbSheetRef.current.close();
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
        rbSheetRef.current.close();
        // setIsImageUpload(true);
      } else if (res.didCancel) {
        console.log('cancel');
        console.log(res.didCancel);
      }
    });
  };

  const validateFields = (
    valueFullName,
    // valueEmail,
    valuePhoneNumber,
    valueAddress,
    // profileImage,
  ) => {
    // Validation for Full Name
    if (!valueFullName.trim()) {
      onChangeError('Full Name Should not be empty.');
      return false;
    }

    // Validation for Email
    // const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!valueEmail.trim()) {
    //   onChangeError('Email is empty.');
    //   return false;
    // } else if (!emailPattern.test(valueEmail)) {
    //   onChangeError('Invalid Email format.');
    //   return false;
    // }

    // Validation for Phone Number
    const phoneNumberPattern = /^\(\d{3}\) \d{3}-\d{4}$/;
    if (!valuePhoneNumber.trim()) {
      onChangeError('Phone Number Should not be empty.');
      return false;
    } else if (!phoneNumberPattern.test(valuePhoneNumber)) {
      onChangeError('Invalid Phone Number format.');
      return false;
    }

    // Validation for Address
    if (!valueAddress.trim()) {
      onChangeError('Address Should not be empty.');
      return false;
    }

    // Validation for Profile Image
    // if (!profileImage) {
    //   onChangeError('Profile Image Should be uploaded.');
    //   return false;
    // }

    // All fields are valid
    return true;
  };

  function CreateProfile() {
    const isValid = validateFields(
      valueFullName,
      // valueEmail,
      valuePhoneNumber,
      valueAddress,
      // profileImage,
    );
    console.log('isValid: ', isValid);
    if (isValid) {
      onChangeError('');
      // Perform the necessary actions when all fields are valid

      var formdataProfile = new FormData();

      formdataProfile.append('display_name', valueFullName);
      formdataProfile.append('telephone', valuePhoneNumber);
      formdataProfile.append('street', valueAddress);

      setLoading(true);
      postRequestWithTokenAndCookie(
        `${BASE_URL}/users/update-user-profile/`,
        formdataProfile,
        AuthReducer.userData.token,
      )
        .then(result => {
          console.log('result of update profile', result);
          setModalVisible(true);
          setLoading(false);
        })
        .catch(error => {
          console.log('error', error);
          setLoading(false);
        });
    } else {
      // Handle the case when some fields are empty or invalid
      // onChangeError('Invalid fields')
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
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log(result);
        setLoading(false);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
        Alert.alert('Error', 'Something went wrong please try again');
      });
  }

  function acceptModal() {
    setModalVisible(false);
    setLoading(true);

    getRequestWithCookie(
      `${BASE_URL}/users/user-profile/`,
      AuthReducer.userData.token,
    )
      .then(result => {
        console.log(result);
        setLoading(false);

        setDataToAsync('user', JSON.stringify(result));

        getDataFromAsync('user')
          .then(res => {
            dispatch(userDataFromAsyncStorage(JSON.parse(res)));
            // console.log('res: ', res);
            dispatch(removeOtpScreen());
          })
          .catch(err => {
            console.log('Error From getting from local storage: ', err);
          });

        // Navigation.navigate('SimpleBottomTab', result);
      })
      .catch(error => {
        console.log('error', error);
        setLoading(false);
      });
  }

  return (
    <>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{alignSelf: 'flex-end', marginBottom: -20}}>
              <Pressable
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Image
                  source={require('../../Assets/Images/cross.png')}
                  style={{width: 18}}
                  resizeMode="contain"
                />
              </Pressable>
            </View>
            <View style={{marginBottom: 30, marginHorizontal: 10}}>
              <Heading
                Heading={'Precious Metals Portfolio Tool'}
                Fontsize={16}
                color={COLORS.dark}
                Fontweight={'bold'}
                txtAlign={'center'}
                mb={10}
              />
              <Heading
                Heading={
                  'Current Value" as shown is a representation of current retail sales price on Priority Gold. This is not an appraisal or estimate of a buyback price with Priority Gold which is based on market conditions, inventory levels, and other factors.'
                }
                Fontsize={16}
                color={'#514C4A'}
                // Fontweight={'bold'}
                txtAlign={'center'}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: 150,
              }}>
              <LinearGradient
                colors={['#BA7607', '#EDCC45']}
                style={{
                  flex: 1,
                  // marginLeft: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 20,
                }}>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    // backgroundColor: 'pink',
                    paddingHorizontal: 35,
                  }}
                  onPress={() => {
                    acceptModal();
                    // setModalVisible(false);
                    // Navigation.navigate('SimpleBottomTab');
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: 18,
                      fontWeight: 'bold',
                    }}>
                    Accept
                  </Text>
                </TouchableOpacity>
              </LinearGradient>
            </View>
          </View>
        </View>
      </Modal>

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
              <ScrollView>
                <View
                  style={{
                    marginHorizontal: '5%',
                    marginTop: Platform.OS === 'ios' ? '20%' : 26,
                  }}>
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
                          Navigation.goBack();
                        }}>
                        <Ionicons
                          name="chevron-back"
                          size={27}
                          color={'black'}
                        />
                      </Pressable>
                    </View>
                  </View>

                  <View
                    style={{
                      alignSelf: 'center',
                      marginTop: '8%',
                      marginBottom: '8%',
                    }}>
                    <Image
                      source={
                        !profileImage
                          ? require('../../Assets/Images/profileIcon.png')
                          : {uri: profileImage}
                      }
                      style={{
                        width: 140,
                        height: 140,
                        borderWidth: 7,
                        borderColor: '#7D7D7D',
                        borderRadius: 75,
                      }}
                      resizeMode={'cover'}
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
                      value={valueFullName}
                      // value={dataFromOtpScreenOfSignUp.email}
                      onChangeText={onChangeFullName}
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
                      // placeholder={dataFromOtpScreenOfSignUp.Email}
                      pass={false}
                      // value={valueEmail}
                      // onChangeText={onChangeEmail}
                      value={
                        userAuth.userData.user.email
                          ? userAuth.userData.user.email
                          : valueEmail
                      }
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
                      placeholder={'4010 Cliffside Drive'}
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
                      btnText={'Create Profile'}
                      justify={'center'}
                      align={'center'}
                      fontSize={16}
                      radius={15}
                      txtwidth={'100%'}
                      txtColor={COLORS.white}
                      color={COLORS.dark}
                      // bgcolor={'#BA7607'}
                      press={() => {
                        CreateProfile();
                        // Navigation.navigate('SimpleBottomTab');
                        // setModalVisible(true);
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
              //   </ImageBackground>
            )}
          </>
        )}
      </Formik>
    </>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#25241C',
    // opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: 'red',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
