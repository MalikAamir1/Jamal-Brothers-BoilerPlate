import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

export const GoogleAuth = () => {
  const Navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          // Navigation.navigate('SimpleBottomTab');
        }}>
        <View>
          {/* <Image
            source={require('../../Assets/Images/googleIcon.png')}
            style={{width: 70, height: 70}}
          /> */}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#db4a39',
    borderRadius: 10,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
