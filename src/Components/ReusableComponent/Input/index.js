import React, {useState} from 'react';
// import {TextInput} from 'react-native-paper';
// import COLORS from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';
import {
  Image,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
// import Feather from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Heading from '../Heading';
// import FONT from '../../../Assets/Style/Font';
import {Calendar} from 'react-native-calendars';
import Entypo from 'react-native-vector-icons/Entypo';
import {ActivityIndicator} from 'react-native-paper';

export default function Input(props) {
  const emptyIcon = () => null;
  const [text, setText] = useState();

  // const [value, onChangeText] = useState('');
  const [notPressed, setNotPressed] = useState(true);
  const [isModalVisible, setModalVisible] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState();
  const [loader, setloader] = useState(false);

  const openCalendar = () => {
    setModalVisible(true);
  };

  const closeCalendar = () => {
    setModalVisible(false);
  };

  const handleIconPress = () => {
    // You can set a state variable to control the modal visibility
    setModalVisible(true);
  };

  return (
    <>
      <Modal
        visible={loader}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}>
        <View style={styles.loaderContainer}>
          <View style={styles.loaderContent}>
            <ActivityIndicator
              size="large"
              // color={COLORS.primary}
            />
          </View>
        </View>
      </Modal>

      <Modal
        visible={isModalVisible}
        animationType="none"
        transparent={false}
        onRequestClose={closeCalendar}>
        <View style={styles.modalContainer}>
          <Pressable
            onPress={() => {
              setModalVisible(false);
            }}>
            <View
              style={{
                alignContent: 'flex-end',
                alignSelf: 'flex-end',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <Entypo name="cross" size={28} color={'black'} />
            </View>
          </Pressable>
          <Calendar
            // Customize the calendar as per your requirement
            onDayPress={day => {
              console.log('Selected day:', day);
              const month = String(day.month).padStart(2, '0');
              const formattedDay = String(day.day).padStart(2, '0');
              const formattedDate = `${month}/${formattedDay}/${day.year}`;
              setPurchaseDate(formattedDate);
              closeCalendar();
            }}
          />
        </View>
      </Modal>
      <View>
        <View>
          <Heading
            ml={props.ml ? props.ml : '11%'}
            Fontsize={14}
            Heading={props.title}
            color="#7B869E"
            mb={-8}
            // fontFamily={FONT.pop}
          />
        </View>
        <View
          style={{
            // backgroundColor: value,
            borderBottomColor: 'rgba(77, 77, 77, 0.7)',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // opacity: props.disabled ? 0.5 : 1,
          }}>
          {props.urlImg && (
            <Image
              source={props.urlImg}
              style={{width: 20, marginTop: 12, marginBottom: 14}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
            />
          )}
          <TextInput
            editable={!props.disabled}
            // multiline
            onChangeText={text => props.onChangeText(text)}
            value={purchaseDate ? purchaseDate : props.value}
            style={{
              width: props.pass ? '55%' : '85%',
              color: '#1C1C1C',
              marginBottom: -3,
              marginLeft: props.mleft
                ? props.mleft
                : Platform.OS === 'ios'
                ? 5
                : -4,
              // fontFamily: FONT.redhat,
              fontSize: 16,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={'#A8A8A8'}
            secureTextEntry={props.pass && !props.dob ? notPressed : false}
            keyboardType={props.keyboardType}
            autoCapitalize={props.autoCapitalize}
          />
          {props.dob ? (
            <View
              style={{
                // backgroundColor: 'pink',
                alignSelf: 'center',
                width: '30%',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Pressable onPress={handleIconPress} disabled={props.disabled}>
                <Icon
                  name={'keyboard-arrow-down'}
                  style={{fontWeight: '900'}}
                  color={'rgba(123, 134, 158, 1)'}
                  size={30}
                />
              </Pressable>
            </View>
          ) : props.pass ? (
            <View
              style={{
                // backgroundColor: 'pink',
                alignSelf: 'center',
                width: '30%',
                alignContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Pressable
                onPress={() => {
                  notPressed ? setNotPressed(false) : setNotPressed(true);
                }}
                disabled={props.disabled}>
                <MaterialIcon
                  name={notPressed ? 'eye-off' : 'eye'}
                  style={{fontWeight: '900'}}
                  color={'#667080'}
                  size={24}
                />
              </Pressable>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
  },
  loaderContent: {
    // backgroundColor: 'white', // Loader background color
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
