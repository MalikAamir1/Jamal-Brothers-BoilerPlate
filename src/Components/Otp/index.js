import React, {useRef} from 'react';
import {TextInput, View, StyleSheet} from 'react-native';

export const OtpInput = props => {
  const inputRefs = useRef([]);
  // const otpValue = useRef('');

  const handleKeyPress = (e, index) => {
    const value = e.nativeEvent.key;
    const isDigit = /^\d+$/.test(value);

    if (e.nativeEvent.key === 'Backspace' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }

    if (isDigit) {
      const newOtpValue =
        props.otpValue.current.substr(0, index) +
        value +
        props.otpValue.current.substr(index + 1);
      props.otpValue.current = newOtpValue;
      inputRefs.current[index].setNativeProps({text: value});
    }
  };

  const handleOTPChange = text => {
    props.otpValue.current = text;
    const digits = text.split('');
    digits.forEach((digit, index) => {
      inputRefs.current[index].setNativeProps({text: digit});
    });
  };

  return (
    <View style={styles.container}>
      {[...Array(6)].map((_, index) => (
        <TextInput
          key={index.toString()}
          ref={ref => (inputRefs.current[index] = ref)}
          style={styles.input}
          keyboardType="numeric"
          maxLength={1}
          onKeyPress={e => handleKeyPress(e, index)}
        />
      ))}
      <TextInput
        style={{position: 'absolute', width: 0, height: 0, opacity: 0}}
        value={props.otpValue.current}
        onChangeText={handleOTPChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: 40,
    height: 60,
    borderBottomWidth: 1,
    // borderRadius: 4,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 4,
    borderBottomColor: '#707070',
    color: '#514C4A',
  },
});
