import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

const DropdownComponent = props => {
  // const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  let {data, defaultValue, setValue, value} = props;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[
          styles.dropdown,
          {
            shadowColor: 'black',
            shadowOffset: {width: 0, height: 2},
            shadowOpacity: 0.5,
            shadowRadius: 4,
            elevation: 2,
            backgroundColor: 'white',
          },
        ]}
        itemTextStyle={{color: '#667080'}}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        // search
        maxHeight={250}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? defaultValue : defaultValue}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 5,
    marginBottom: '10%',
    borderRadius: 50,
  },
  dropdown: {
    height: 50,
    borderRadius: 65,
    paddingHorizontal: 12,
    color: '#667080',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: '#667080',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#667080',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#667080',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'black',
    // borderRadius:10
  },
});
