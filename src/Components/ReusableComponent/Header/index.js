import React, {useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import Heading from '../Heading';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import COLORS from '../../../Assets/Style/Color';
import {useNavigation} from '@react-navigation/native';
import {Text} from 'react-native-paper';

export const Header = props => {
  const Navigation = useNavigation();

  const [notificationCount, setNotificationCount] = useState(1);
  return (
    <View
      style={{
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            Navigation.navigate('Drawer');
          }}>
          <Image
            source={require('../../../Assets/Images/menuIcon.png')}
            style={{
              width: 30,
              height: 30,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
          {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
        </Pressable>
      </View>
      <View style={{alignSelf: 'center'}}>
        <Heading
          Heading={props.header}
          Fontsize={20}
          //   color={COLORS.dark}
          Fontweight={'bold'}
          txtAlign={'center'}
        />
      </View>
      <View style={{alignSelf: 'center'}}>
        <Pressable
          onPress={() => {
            Navigation.navigate('Notifications');
          }}
          style={{position: 'relative'}}>
          <Ionicons name="notifications" size={26} color={'#514C4A'} />
          {notificationCount > 0 && (
            <View
              style={{
                position: 'absolute',
                // top: -2,
                right: -1,
                backgroundColor: 'red',
                borderRadius: 50,
                borderWidth: 2,
                borderColor: 'white',
                width: 15,
                height: 15,
                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                alignContent: 'center',
              }}>
              <Text
                style={{
                  color: 'white',
                  fontSize: 8,
                  fontWeight: 'bold',
                  padding: 0,
                  margin: 0,
                }}>
                {notificationCount}
              </Text>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
};
