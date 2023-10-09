import {Formik} from 'formik';
import React, {useState} from 'react';
import {
  Image,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {ActivityIndicator, Button, Text} from 'react-native-paper';
import ButtonComp from '../../Components/ReusableComponent/Button';
import Heading from '../../Components/ReusableComponent/Heading';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {ModalView} from '../../Components/ReusableComponent/Modal';
import LinearGradient from 'react-native-linear-gradient';
import {Loader} from '../../Components/ReusableComponent/Loader';
import Head from '../../Components/ReusableComponent/Head';
import {postRequest} from '../../App/fetch';
import {BASE_URL} from '../../App/api';

export const TermofServices = ({route}) => {
  const [passHide, setPassHide] = useState(false);
  const [loading, setLoading] = useState(false);

  const Navigation = useNavigation();

  const [modalVisible, setModalVisible] = useState(false);
  const DataFromSignUp = route.params;
  console.log(DataFromSignUp.valuePass);

  const acceptCondition = () => {};

  function EmailSentForOtp() {
    var formdata = new FormData();

    formdata.append('email', DataFromSignUp.valueEmail);
    formdata.append('password', DataFromSignUp.valuePass);
    formdata.append('profile.display_name', DataFromSignUp.valueEmail);

    setLoading(true);
    postRequest(`${BASE_URL}/users/registration/user/`, formdata)
      .then(result => {
        setLoading(false);
        console.log('result of TermOfServices', result);
        Navigation.navigate('OtpScreen', DataFromSignUp);
      })
      .catch(error => {
        setLoading(false);
        console.log('error', error);
      });
  }

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to reject?'}
        no={() => {
          setModalVisible(false);
        }}
        yes={() => {
          setModalVisible(!modalVisible);
          Navigation.navigate('SignUp');
        }}
      />

      {/* <SafeArea>
        <SafeArea> */}
      {loading ? (
        <Loader />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: Platform.OS === 'ios' ? '4%' : '-5%',
          }}>
          <View
            style={{
              flexDirection: 'column',
              // justifyContent: 'space-between',
              flex: 1,
              marginVertical: '8%',
            }}>
            <View>
              <Head head={'Terms Of Services'} />
              <View style={{marginHorizontal: '4%', marginTop: '10%'}}>
                <Heading
                  //   Stylefont={'normal'}
                  Fontweight={'bold'}
                  Fontsize={18}
                  Heading={'Nullam Porta Diam Id Dolar'}
                  color={'#0B105C'}
                />
                <Heading
                  Stylefont={'normal'}
                  Fontsize={13}
                  Heading={
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                  }
                  color={'#7B869E'}
                  mt={'4%'}
                />
              </View>
              <View style={{marginHorizontal: '4%', marginTop: '5%'}}>
                <Heading
                  Fontweight={'bold'}
                  Fontsize={18}
                  Heading={'Nullam Porta Diam Id Dolar'}
                  color={'#0B105C'}
                />
                <Heading
                  Stylefont={'normal'}
                  Fontsize={13}
                  Heading={
                    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
                  }
                  color={'#7B869E'}
                  mt={'4%'}
                />
              </View>
            </View>

            <View
              style={{
                margin: '5%',
                marginTop: 70,
              }}>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: '#E1E1E1',
                    borderWidth: 1,
                    borderColor: 'rgba(11, 16, 92, 0.2)',
                    // borderColor: '#0B105C',
                    padding: 8,
                    marginRight: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 165,
                    height: 56,
                    borderRadius: 7,
                  }}
                  onPress={() => {
                    setModalVisible(true);
                  }}>
                  <Text
                    style={{
                      color: '#0B105C',
                      fontSize: 16,
                      // fontWeight: 'bold',
                    }}>
                    Reject
                  </Text>
                </TouchableOpacity>
                <LinearGradient
                  colors={['#FCDD8E', '#F9B401']}
                  start={{x: 0.5, y: -5}}
                  end={{x: 0.4, y: 4}}
                  style={{
                    flex: 1,
                    marginLeft: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 181,
                    borderRadius: 7,
                  }}>
                  <TouchableOpacity
                    style={{
                      width: 190,
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      Navigation.navigate('OtpScreen', {
                        screenName: 'TermofServices',
                      });
                      EmailSentForOtp();
                    }}>
                    <Text
                      style={{
                        color: '#0B105C',
                        fontSize: 16,
                        // fontWeight: 'bold',
                      }}>
                      Accept
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainBtn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: '8%',
    // Bottom:'30%'
    // marginBottom: 30,
    alignSelf: 'center',
    // margin:100
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // margin:10,
    // marginTop: 22,
    backgroundColor: '#25241C',
    opacity: 0.9,
  },
  modalView: {
    margin: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
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
