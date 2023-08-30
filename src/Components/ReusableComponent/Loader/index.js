import {ImageBackground, View} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';

export const Loader = () => {
  return (
    <>
      {/* <ImageBackground
        source={require('../../../Assets/Images/bg.png')}
        resizeMode="cover"
        style={{flex: 1}}> */}
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}>
        <ActivityIndicator size="large" color="#EDCC45" />
      </View>
      {/* </ImageBackground> */}
    </>
  );
};
