import {useNavigation} from '@react-navigation/native';
import {Image, Platform, Pressable, View} from 'react-native';
import Heading from '../Heading';
import {useState} from 'react';

function HeadWithIcon(props) {
  //   const {
  //     Stylefont,
  //     Fontweight,
  //     Fontsize,
  //     txtAlign,
  //     ml,
  //     mt,
  //     p,
  //     lh,
  //     Head,
  //     mx,
  //     color,
  //     as,
  //     backgroundColor,
  //     borderRadius,
  //     aI,
  //     width,
  //     mv,
  //     mb,
  //     fontFamily,
  //   } = props;

  const Navigation = useNavigation();
  const [screenName, setScreenName] = useState(
    props.screenName ? props.screenName : false,
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '1%',
        justifyContent: 'space-between',
        // marginTop: Platform.OS === 'ios' ? -10 : 0,
        //   margin: '8%',
        //   marginBottom: 0,
      }}>
      <View
        style={{
          flexDirection: 'row',
          margin: Platform.OS === 'ios' ? '6%' : '6%',
          marginBottom: 0,
        }}>
        <Pressable
          onPress={() => {
            screenName ? Navigation.navigate('Home') : Navigation.goBack();
            // setScreenName(false);
          }}>
          <Image
            source={require('../../../Assets/Images/back.png')}
            style={{
              width: 18,
              height: 15,
              alignContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}
          />
        </Pressable>
      </View>
      <View style={{marginTop: '6%'}}>
        <Heading
          Stylefont={'normal'}
          Fontweight={'bold'}
          Fontsize={18}
          Heading={props.head}
          color={'#0B105C'}
          txtAlign={'center'}
          ml={-25}
        />
      </View>
      <View style={{textAlign: 'center'}}>
        <Pressable
          onPress={() => {
            // screenName ? Navigation.navigate('Home') : Navigation.goBack();
            // setScreenName(false);
            Navigation.navigate('EditProfile');
          }}>
          <Image
            source={require('../../../Assets/Images/editprofile.png')}
            style={{
              width: 20,
              height: 21,
              //   alignContent: 'center',
              //   alignItems: 'center',
              //   alignSelf: 'center',
              margin: '5%',
              // marginLeft: 10
              marginRight: -5,
              marginTop: 15,
            }}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default HeadWithIcon;
