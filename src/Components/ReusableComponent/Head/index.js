import {useNavigation} from '@react-navigation/native';
import {Image, Platform, Pressable, View} from 'react-native';
import Heading from '../Heading';
import {useState} from 'react';

function Head(props) {
  const Navigation = useNavigation();
  const [screenName, setScreenName] = useState(
    props.screenName ? props.screenName : false,
  );
  const [backName, setBackName] = useState(
    props.backName ? props.backName : false,
  );
  const [lostCard, setLostCard] = useState(
    props.lostCard ? props.lostCard : false,
  );
  const [foundCard, setFoundCard] = useState(
    props.foundCard ? props.foundCard : false,
  );
  // console.log(screenName)

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '2%',
        justifyContent: 'space-between',
        // marginTop: Platform.OS === 'ios' ? '10%' : 0,
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
            screenName
              ? Navigation.navigate('Home')
              : backName == 'Profile'
              ? Navigation.navigate('ReturnedCards')
              : lostCard
              ? Navigation.navigate('LostCards')
              : foundCard
              ? Navigation.navigate('FoundCardsList')
              : Navigation.goBack();
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
          color={'rgba(11, 16, 92, 1)'}
        />
      </View>
      <View>
        <Heading
          Stylefont={'normal'}
          Fontweight={'bold'}
          Fontsize={18}
          Heading={'             '}
          color={'black'}
        />
      </View>
    </View>
  );
}

export default Head;
