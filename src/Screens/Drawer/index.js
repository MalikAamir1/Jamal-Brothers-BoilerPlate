import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  View,
  Modal,
  Platform,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Heading from '../../Components/ReusableComponent/Heading';
import COLORS from '../../Assets/Style/Color';
// import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import {Svg, Defs, LinearGradient, Stop, Rect, Path} from 'react-native-svg';
import {ScrollView} from 'react-native-gesture-handler';

export const Drawer = () => {
  const Navigation = useNavigation();

  const AuthReducer = useSelector(state => state.AuthReducer);

  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('modalVisible: ', modalVisible);
  }, [modalVisible]);

  return (
    <>
      {/* <SafeArea> */}
      {/* <ScrollView style={{flex: 1}}> */}
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
          removeDataToAsync('token');
          removeDataToAsync('user');
          dispatch(removeUserDataFromAsyncStorage());
        }}
      />

      {/* <SafeArea> */}
      {/* <View style={{flex: 1}}> */}
      {/* <ImageBackground
        source={require('../../Assets/Images/background.jpg')}
        resizeMode="cover"
        style={{flex: 1}}> */}
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginHorizontal: 30,
            marginTop: Platform.OS === 'ios' ? '18%' : 20,
            // marginTop: '18%',
            marginBottom: '5%',
          }}>
          <View
            style={{
              alignSelf: 'center',
              backgroundColor: '#EDCC45',
              borderRadius: 10,
            }}>
            <Pressable
              onPress={() => {
                Navigation.navigate('SimpleBottomScreen');
              }}>
              <Ionicons name="chevron-back" size={30} color={'black'} />
            </Pressable>
          </View>
          <View
            style={{
              width: 200,
              height: 50,
              backgroundColor: 'white',
            }}>
            {/* <Image
              style={{
                width: 200,
                height: 50,
              }}
              resizeMode={'contain'}
              source={require('../../Assets/Images/drawerlogo.png')}
            /> */}
          </View>
          <View>
            <Text> </Text>
          </View>
        </View>

        <View
          style={{
            marginHorizontal: 30,
            justifyContent: 'flex-start',
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: 100,
              height: 100,
              borderColor: '#7D7D7D',
              borderWidth: 5,
              borderRadius: 55,
            }}
            resizeMode={'stretch'}
            source={{
              uri: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
            }}
            // source={require('../../Assets/Images/profileIcon.png')}
          />
          <View style={{alignSelf: 'center', marginLeft: 5, marginTop: 5}}>
            <Heading
              Heading={AuthReducer?.userData?.user?.profile?.display_name}
              Fontsize={15}
              color={COLORS.dark}
              Fontweight={'bold'}
              // txtAlign={'center'}
            />
            <Heading
              Heading={AuthReducer?.userData?.user?.email}
              Fontsize={15}
              color={COLORS.dark}
              width={190}
              // Fontweight={'bold'}
              // txtAlign={'center'}
            />
          </View>
        </View>

        <View style={{marginTop: '15%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('Home');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/homeBlack.png')}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Home'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{marginTop: '8%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('BottomScreen2');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/homeBlack.png')}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Screen 2'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{marginTop: '8%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('BottomScreen3');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/homeBlack.png')}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Screen 3'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{marginTop: '8%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('BottomScreen4');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/homeBlack.png')}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Screen 4'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{marginTop: '8%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('Profile');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/profileBlack.png')}
                resizeMode={'contain'}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Profile'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{marginTop: '8%', marginLeft: '10%'}}>
          <Pressable
            onPress={() => {
              Navigation.navigate('Settings');
            }}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../Assets/Images/settingBlack.png')}
                style={{
                  width: 18,
                  height: 18,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignContent: 'center',
                  alignSelf: 'center',
                }}
              />
              <Heading
                Heading={'  Settings'}
                Fontsize={15}
                color={COLORS.dark}
                Fontweight={'bold'}
                // txtAlign={'center'}
              />
            </View>
          </Pressable>
        </View>

        <View style={{top: 25}}>
          <Pressable
            onPress={() => {
              setModalVisible(true);
              console.log('working');
            }}>
            <ImageBackground
              source={require('../../Assets/Images/signOutbackground.png')}
              resizeMode={'stretch'}
              style={{
                width: 200,
                height: 55,
                marginBottom: Platform.OS === 'ios' ? 0 : 45,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  top: 15,
                  right: 18,
                }}>
                <Image
                  source={require('../../Assets/Images/signOut.png')}
                  style={{
                    width: 18,
                    height: 18,
                  }}
                />
                <Heading
                  Heading="    Sign Out"
                  Fontsize={17}
                  color={COLORS.white}
                  Fontweight="bold"
                />
              </View>
            </ImageBackground>
          </Pressable>
        </View>

        {/* </View> */}
      </ScrollView>
      {/* </ImageBackground> */}
      {/* </View> */}
      {/* </SafeArea> */}
      {/* </ScrollView> */}
      {/* </SafeArea> */}
    </>
  );
};
import {StyleSheet} from 'react-native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import {removeUserDataFromAsyncStorage} from '../../Store/Reducers/AuthReducer';
import {useDispatch, useSelector} from 'react-redux';
import {removeDataToAsync} from '../../Utils/getAndSetAsyncStorage';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
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
    borderColor: 'black',
    // borderWidth: 1,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
