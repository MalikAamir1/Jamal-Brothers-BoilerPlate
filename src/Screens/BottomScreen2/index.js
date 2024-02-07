import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import {Header} from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Heading from '../../Components/ReusableComponent/Heading';

export default function BottomScreen2() {
  const [loader, setloader] = useState(false);
  const Navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const AuthReducer = useSelector(state => state.AuthReducer);
  const loggedInUserEmail = AuthReducer?.userData?.user?.email;
  const display_name = AuthReducer?.userData?.user?.profile?.display_name;

  useEffect(() => {
    setloader(true);
    const fetchData = async () => {
      try {
        const snapshot = await database().ref('users').once('value');

        const chatData = snapshot.val();
        if (chatData) {
          const chatArray = Object.values(chatData);
          const filteredUserData = chatArray.filter(
            user => user.email !== loggedInUserEmail,
          );
          // console.log('eghjyb', filteredUserData);

          setUserData(filteredUserData);
          setloader(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };

    fetchData();
  }, []);

  const getData = () => {
    setloader(true);
    const fetchData = async () => {
      try {
        const snapshot = await database().ref('users').once('value');

        const chatData = snapshot.val();
        if (chatData) {
          const chatArray = Object.values(chatData);
          const filteredUserData = chatArray.filter(
            user => user.email !== loggedInUserEmail,
          );
          // console.log('eghjyb', filteredUserData);

          setUserData(filteredUserData);
          setloader(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };

    fetchData();
  };

  useFocusEffect(
    useCallback(() => {
      setloader(true);
      getData();
    }, []),
  );

  const filteredData = userData.filter(item => {
    // Check if item's display_name is not equal to the one in the reducer
    return item.display_name !== display_name;
  });

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '5%',
            // marginVertical: '5%',
            marginBottom: '7%',
          }}>
          <Header header={'Chats'} screenName={true} />
        </View>
      </>
    );
  };

  const renderItem = ({item}) => {
    return (
      <>
        <TouchableOpacity
          onPress={() =>
            Navigation.navigate('ChatScreen', {userToken: item.token})
          }>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              // marginHorizontal: '%',
              width: '100%',
              // marginBottom: 10,
            }}>
            <View
              style={{
                flex: 1,
                borderBottomColor: 'rgba(156, 156, 156, 0.7)',
                borderRadius: 7,
                borderBottomWidth: 0.5,
                height: 69,
                //   width: 332,
                marginTop: 10,
                marginHorizontal: '2%',
              }}>
              <View
                style={{
                  // justifyContent: 'space-between',
                  flexDirection: 'row',
                  // marginTop: 40,
                }}>
                <View>
                  <Image
                    source={{uri: item.profileImage ? item.profileImage : null}}
                    style={{
                      width: 57,
                      height: 57,
                      borderRadius: 28.5,
                      marginRight: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}>
                  <View style={{marginLeft: 2}}>
                    <View
                      style={{
                        // flexDirection: 'row',
                        marginTop: 3,
                      }}>
                      <Heading
                        Heading={item.display_name}
                        Fontsize={18}
                        //   color={COLORS.dark}
                        color={'rgba(16, 35, 78, 1)'}
                        // Fontweight={'bold'}
                        // txtAlign={'center'}
                      />
                    </View>
                    <Heading
                      Heading={item.latestMessage}
                      Fontsize={14}
                      color={'rgba(156, 156, 156, 1)'}
                      // txtAlign={'center'}
                      mt={5}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'column',
                    }}>
                    <View>
                      <Image
                        source={require('../../Assets/Images/notificationquantity.png')}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeArea style={{flex: 1}}>
        {loader ? (
          <Loader />
        ) : (
          <View
            style={{
              //   marginVertical: '5%',

              marginVertical: '5%',
              marginBottom: Platform.OS === 'ios' ? '13.5%' : '18%',
              // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              // borderBottomWidth: 1,
            }}>
            <FlatList
              data={filteredData}
              keyExtractor={item => item.token}
              renderItem={renderItem}
              // keyExtractor={item => item.metal_id}
              contentContainerStyle={{
                flexDirection: 'column',
                paddingBottom: 70,
              }}
              ListHeaderComponent={ListHeaderComponent}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={loader}
                  onRefresh={() => {
                    // setRefreshing(true); // Start the refresh animation
                    // getData(); // Fetch new data
                  }}
                />
              }
            />
          </View>
        )}
      </SafeArea>
    </>
  );
}
