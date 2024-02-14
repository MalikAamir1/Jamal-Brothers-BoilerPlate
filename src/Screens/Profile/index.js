import {
  FlatList,
  Image,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import HeadWithIcon from '../../Components/ReusableComponent/HeadWithIcon';
import Heading from '../../Components/ReusableComponent/Heading';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useState} from 'react';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

export const Profile = ({route}) => {
  const [secondModal, setSecondModal] = useState(false);
  const AuthReducer = useSelector(state => state.AuthReducer);

  const data = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <View
          style={{
            borderColor: 'rgba(11, 16, 92, 0.1)',
            marginHorizontal: '5%',
            borderRadius: 7,
            borderWidth: 1,
            height: 138,
            // width: 342,
            marginTop: 20,
          }}></View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View>
          <View>
            <HeadWithIcon head={'Profile'} screenName={true} />
          </View>

          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                alignItems: 'center',
                margin: 20,
                marginTop: 50,
              }}>
              <View
                style={{
                  width: 98,
                  height: 98,
                  alignSelf: 'center',
                  // marginTop: '8%',
                  // marginBottom: '8%',
                  backgroundColor: 'white',
                  borderWidth: 2,
                  borderColor: 'rgba(11, 16, 92, 0.3)',
                  borderRadius: 75,
                }}>
                <Image
                  // source={require('../../Assets/Images/profileImage.png')}
                  source={{
                    uri: `https://nextgenbulliontool.com${AuthReducer?.userData?.user?.profile?.profile_pic}`,
                  }}
                  style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    width: 87,
                    height: 89,
                    marginTop: 2,
                    borderRadius: 75,
                  }}
                  resizeMode={'cover'}
                />
              </View>
            </View>
            <View style={{marginTop: 40, marginLeft: -5}}>
              <Heading
                Stylefont={'normal'}
                Fontweight={'bold'}
                Fontsize={24}
                // txtAlign={'center'}
                // p={10}
                lh={26}
                Heading={AuthReducer?.userData?.user?.profile?.display_name}
                color={'rgba(16, 35, 78, 1)'}
                // ml={-10}
                //   mb={20}
                //   width={170}
                mt={10}
                // ml={-32}
              />
              <View style={{flexDirection: 'row', marginVertical: 10}}>
                <FontAwesome
                  name="envelope-o"
                  size={18}
                  color="rgba(156, 156, 156, 1)"
                  // style={{paddingLeft: 5}}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  // txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.email}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={10}
                  //   mb={20}
                    width={170}
                  // mt={10}
                />
              </View>
              <View style={{flexDirection: 'row', marginVertical: 8}}>
                <Feather
                  name="phone"
                  size={18}
                  color="rgba(156, 156, 156, 1)"
                  // style={{paddingLeft: 5}}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.profile?.telephone}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={10}
                  //   mb={20}
                  //   width={170}
                  // mt={10}
                />
              </View>
              <View style={{flexDirection: 'row', marginVertical: 8}}>
                <EvilIcons
                  name="location"
                  size={28}
                  color="rgba(156, 156, 156, 1)"
                  style={{marginLeft: -5}}
                />
                <Heading
                  Stylefont={'normal'}
                  // Fontweight={'bold'}
                  Fontsize={13}
                  // txtAlign={'center'}
                  // p={10}
                  // lh={26}
                  Heading={AuthReducer?.userData?.user?.profile?.street}
                  color={'rgba(0, 36, 97, 1)'}
                  ml={7}
                  //   mb={20}
                  width={200}
                  // mt={10}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <>
      <SafeArea>
        <View
          style={{
            //   marginVertical: '5%',
            marginBottom: Platform.OS === 'ios' ? '18%' : '8%',
          }}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.metal_id}
            contentContainerStyle={{flexDirection: 'column'}}
            ListHeaderComponent={ListHeaderComponent}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeArea>
    </>
  );
};
