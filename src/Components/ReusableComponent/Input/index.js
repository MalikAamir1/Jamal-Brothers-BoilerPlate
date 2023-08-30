import React, {useState} from 'react';
// import {TextInput} from 'react-native-paper';
// import COLORS from '../../../Assets/Style/Color';
import {useSelector} from 'react-redux';
import {Image, Pressable, TextInput, View} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import Heading from '../Heading';

export default function Input(props) {
  const emptyIcon = () => null;
  const [text, setText] = useState();

  // const [value, onChangeText] = useState('');
  const [notPressed, setNotPressed] = useState(true);

  return (
    <>
      <View>
        <View>
          <Heading
            ml={'11%'}
            Fontsize={15}
            Heading={props.title}
            color={'#514C4A'}
            mb={-10}
          />
        </View>
        <View
          style={{
            // backgroundColor: value,
            borderBottomColor: '#000000',
            borderBottomWidth: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            // opacity: props.disabled ? 0.5 : 1,
          }}>
          {props.urlImg && (
            <Image
              source={props.urlImg}
              style={{width: 20, marginTop: 12}}
              resizeMethod={'resize'}
              resizeMode={'contain'}
            />
          )}
          <TextInput
            editable={!props.disabled}
            // multiline
            onChangeText={text => props.onChangeText(text)}
            value={props.value}
            style={{
              width: props.pass ? '55%' : '85%',
              color: '#A8A8A8',
              marginBottom: -7,
            }}
            placeholder={props.placeholder}
            placeholderTextColor={'#A8A8A8'}
            secureTextEntry={props.pass ? notPressed : false}
          />
          {props.pass ? (
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
                <Feather
                  name={notPressed ? 'eye-off' : 'eye'}
                  style={{fontWeight: '900'}}
                  color={'#BA7607'}
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