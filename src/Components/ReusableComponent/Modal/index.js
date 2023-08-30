import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Image, ImageBackground, Pressable, View, Modal} from 'react-native';
import Heading from '../Heading';
// import COLORS from '../../../Assets/Style/Color';
import {Button, Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export const ModalView = props => {
  const handleButtonPress = () => {
    console.log('Button pressed');
  };

  // const [modalVisible, setModalVisible] = useState(true);

  let {set, get, cross, txt, no, yes} = props;

  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={get}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{alignSelf: 'flex-end', marginBottom: -20}}>
            <Pressable onPress={cross}>
              <Image
                source={require('../../../Assets/Images/cross.png')}
                style={{width: 15}}
                resizeMode="contain"
              />
            </Pressable>
          </View>
          <View style={{marginBottom: 30, marginHorizontal: 30}}>
            <Heading
              Heading={txt}
              Fontsize={22}
            //   color={COLORS.dark}
              // Fontweight={'bold'}
              txtAlign={'center'}
            />
          </View>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#000000',
                padding: 5,
                marginRight: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={no}>
              <Text
                style={{color: '#000000', fontSize: 15, fontWeight: 'bold'}}>
                No
              </Text>
            </TouchableOpacity>

            <LinearGradient
              colors={['#BA7607', '#EDCC45']}
              style={{
                flex: 1,
                marginLeft: 5,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <TouchableOpacity
                style={{
                  padding: 10,
                  // backgroundColor: 'pink',
                  width: 110,
                  alignContent: 'center',
                  alignItems: 'center',
                }}
                onPress={yes}>
                <Text
                  style={{color: '#FFFFFF', fontSize: 15, fontWeight: 'bold'}}>
                  Yes
                </Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#25241C',
    // opacity: 0.9,
  },
  modalView: {
    margin: 30,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    // paddingTop: 0,
    paddingBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4,
    elevation: 200,
    opacity: 1000,
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
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius:100
    // backgroundColor: 'pink',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 35,
    backgroundColor: 'transparent',
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    // elevation: 5,
  },
  buttonShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {width: 0, height: 1},
    textShadowRadius: 2,
    // backgroundColor: 'red',
    width: '100%',
  },
});
