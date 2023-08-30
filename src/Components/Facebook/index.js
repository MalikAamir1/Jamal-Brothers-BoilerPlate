import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

export const FaceBookAuth = () => {
  const Navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
      //  onPress={() => Navigation.navigate('SimpleBottomTab')}
      >
        {/* <Image
          source={require('../../Assets/Images/facebookIcon.png')}
          style={{width: 70, height: 70}}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
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
