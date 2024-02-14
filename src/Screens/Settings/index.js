import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import COLORS from '../../Assets/Style/Color';
import Heading from '../../Components/ReusableComponent/Heading';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Text } from 'react-native-paper';
import Input from '../../Components/ReusableComponent/Input';
import { Formik } from 'formik';
import * as yup from 'yup';
import ButtonComp from '../../Components/ReusableComponent/Button';
import { width } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { ModalView } from '../../Components/ReusableComponent/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { removeUserDataFromAsyncStorage } from '../../Store/Reducers/AuthReducer';
import { removeDataToAsync } from '../../Utils/getAndSetAsyncStorage';
import { BASE_URL } from '../../App/api';
import { Loader } from '../../Components/ReusableComponent/Loader';
import Head from '../../Components/ReusableComponent/Head';
import app from '../../Firebase/firebaseConfig';

export const Settings = () => {
  const Navigation = useNavigation();
  const AuthReducer = useSelector(state => state.AuthReducer.userData);
  // console.log('AuthReducer', AuthReducer.user.id);

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to Logout?'}
        no={() => {
          setModalVisible(!modalVisible);
        }}
        yes={() => {
          setModalVisible(!modalVisible);
          // Navigation.navigate('login');
          removeDataToAsync('token');
          removeDataToAsync('user');
          dispatch(removeUserDataFromAsyncStorage());
        }}
      />
      <ModalView
        set={setDeleteModalVisible}
        get={deleteModalVisible}
        cross={() => setDeleteModalVisible(false)}
        txt={'Are you sure you want to Delete the account?'}
        no={() => {
          setDeleteModalVisible(!deleteModalVisible);
        }}
        yes={() => {
          setDeleteModalVisible(!deleteModalVisible);
          // Navigation.navigate('login');
          var myHeaders = new Headers();
          myHeaders.append('Authorization', `Token ${AuthReducer.token}`);

          var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
          };

          setLoading(true);
          fetch(`${BASE_URL}/users/delete-account/`, requestOptions)
            // .then(response => response.json())
            .then(result => {
              console.log('result of delete ', result);
              app
                .database()
                .ref(`users/${AuthReducer.user.id}`)
                .update({
                  is_active: false,
                })
                .then(() => {
                  console.log('User data inactive successfully in database'),
                  removeDataToAsync('token');
                  removeDataToAsync('user');
                  dispatch(removeUserDataFromAsyncStorage());
                });
              // removeDataToAsync('token');
              // removeDataToAsync('user');
              // dispatch(removeUserDataFromAsyncStorage());
              setLoading(false);
            })
            .catch(error => {
              console.log('error', error);
              setLoading(false);
            });
        }}
      />
      {loading ? (
        <Loader />
      ) : (
        <SafeArea>
          <ScrollView>
            <View style={{ marginHorizontal: '5%' }}>
              <View style={{ marginBottom: 20 }}>
                <Head head={'Settings'} screenName={true} />
              </View>

              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  marginTop: 20,
                  padding: Platform.OS === 'ios' ? 6 : 7,
                  borderColor: '#E4E4E4',
                  borderRadius: 30,
                  shadowColor: 'black',
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                  elevation: 5,
                }}>
                <View style={{ marginLeft: 10 }}>
                  {/* <View style={{paddingLeft: 10}}> */}
                  <Heading
                    Heading={'Notifications'}
                    Fontsize={16}
                    color={COLORS.dark}
                    txtAlign={'center'}
                    mt={Platform.OS === 'ios' ? 4 : 2}
                    ml={2}
                  />
                </View>
                <View style={{ marginRight: 10 }}>
                  <Switch
                    trackColor={{ false: 'black', true: '#BA7607' }}
                    thumbColor={isEnabled ? 'white' : '#f4f3f4'}
                    ios_backgroundColor="#BA7607"
                    // ios_backgroundColor="black"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                    style={{
                      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
                    }}
                  />
                </View>
              </View>

              <Pressable
                onPress={() => {
                  Navigation.navigate('PasswordChange');
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Change Password'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/next.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  Navigation.navigate('HelpAndSupport');
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Help & Support'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/next.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Navigation.navigate('AboutApp');
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'About App'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/next.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Navigation.navigate('PrivacyPolicy');
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Privacy Policy'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/next.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  Navigation.navigate('TermsAndCondition');
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Terms & Conditions'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/next.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>
              <Pressable
                onPress={() => {
                  setDeleteModalVisible(true);
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 20,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Delete Account'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 18 }}>
                    <MaterialCommunityIcons
                      name="delete-forever"
                      size={25}
                      color={'black'}
                    />
                  </View>
                </View>
              </Pressable>

              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    width: '100%',
                    marginTop: 18,
                    padding: 10,
                    borderColor: '#E4E4E4',
                    borderRadius: 30,
                    shadowColor: 'black',
                    shadowOpacity: 0.2,
                    shadowRadius: 5,
                    elevation: 5,
                  }}>
                  <View style={{ paddingLeft: 10 }}>
                    <Heading
                      Heading={'Logout'}
                      Fontsize={16}
                      color={COLORS.dark}
                      txtAlign={'center'}
                    />
                  </View>
                  <View style={{ paddingRight: 20 }}>
                    <Image
                      source={require('../../Assets/Images/signOutBlack.png')}
                      style={{
                        width: 20,
                        height: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignContent: 'center',
                        alignSelf: 'center',
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </View>
              </Pressable>
            </View>
          </ScrollView>
        </SafeArea>
      )}
    </>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
