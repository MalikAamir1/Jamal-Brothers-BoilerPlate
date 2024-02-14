import { FlatList, Image, Pressable, TouchableOpacity, View } from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import { Header } from '../../Components/ReusableComponent/Header';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import { Loader } from '../../Components/ReusableComponent/Loader';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';
import database from '@react-native-firebase/database';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Heading from '../../Components/ReusableComponent/Heading';
import { ModalView } from '../../Components/ReusableComponent/Modal';

export default function BottomScreen2() {
  const [loader, setloader] = useState(false);
  const Navigation = useNavigation();
  const [userData, setUserData] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [latestOne, setLatestOne] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // New state variable
  const [contactList, setContactList] = useState(false); // New state variable
  const [combinedDataState, setCombinedDataState] = useState([]); // New state variable
  const AuthReducer = useSelector(state => state.AuthReducer);
  const AuthReducerID = useSelector(state => state.AuthReducer?.userData?.user?.id);
  const loggedInUserEmail = AuthReducer?.userData?.user?.email;
  const display_name = AuthReducer?.userData?.user?.profile?.display_name;

  useEffect(() => {
    setloader(true);
    const fetchData = async () => {
      try {
        const snapshot = await database().ref('users').once('value');

        // const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
        // const latestUpdateArray = latestUpdate.val();
        // setLatestOne(latestUpdateArray)

        const chatData = snapshot.val();
        if (chatData) {
          const chatArray = Object.values(chatData);
          const filteredUserData = chatArray.filter(
            user => user.email !== loggedInUserEmail,
          );
          const filteredInactiveData = filteredUserData.filter(
            user => user.is_active !== false,
          );

          // setAllUsers(filteredInactiveData);
          // const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
          // const latestUpdateArray = latestUpdate.val();
          // setLatestOne(latestUpdateArray)
          const filteredData = filteredInactiveData.filter(item => {
            // Check if item's display_name is not equal to the one in the reducer
            return item.display_name !== display_name;
          });
          setAllUsers(filteredData);

        }
        // setloader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };

    const fetchData2 = async () => {
      try {
        const snapshot = await database().ref(`messages/${AuthReducerID}`).once('value');

        const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
        const latestUpdateArray = latestUpdate.val();
        setLatestOne(latestUpdateArray)

        const chatData = snapshot.val();

        console.log('chatArray', chatData)
        if (chatData) {
          // const chatArray = Object.values(chatData);
          const userIds = Object.keys(chatData); // Extract user IDs from chatData
          const usersSnapshot = await database().ref('users').once('value');
          const usersData = usersSnapshot.val();

          if (usersData) {
            const filteredUserData = userIds.map(userId => usersData[userId]);
            const filteredInactiveData = filteredUserData.filter(
              user => user.is_active !== false,
            );

            console.log('chatArray22222', filteredInactiveData)
            const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
            const latestUpdateArray = latestUpdate.val();
            // setLatestOne(latestUpdateArray)

            const combinedData = filteredInactiveData.map(user => {
              const latestMessageObject = latestUpdateArray?.[user?.id];
              const latestMessage = latestMessageObject?.latestMessage || '';
              const senderId = latestMessageObject?.senderId || '';
              const seen = latestMessageObject?.seen || false;

              return {
                ...user,
                latestMessage,
                seen,
                senderId,
              };
            });
            // setUserData(filteredInactiveData)
            setCombinedDataState(combinedData)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setloader(false);
      }
    };
    setloader(false);

    fetchData2();
    fetchData();
  }, []);

  const getData = async () => {
    setloader(true);
    // const fetchData = async () => {
      try {
        const snapshot = await database().ref(`messages/${AuthReducerID}`).once('value');

        const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
        const latestUpdateArray = latestUpdate.val();
        setLatestOne(latestUpdateArray)

        const chatData = snapshot.val();

        console.log('chatArray', chatData)
        if (chatData) {
          // const chatArray = Object.values(chatData);
          const userIds = Object.keys(chatData); // Extract user IDs from chatData
          const usersSnapshot = await database().ref('users').once('value');
          const usersData = usersSnapshot.val();

          if (usersData) {
            const filteredUserData = userIds.map(userId => usersData[userId]);
            const filteredInactiveData = filteredUserData.filter(
              user => user.is_active !== false,
            );

            console.log('chatArray22222', filteredInactiveData)
            const latestUpdate = await database().ref(`latest/${AuthReducerID}`).once('value');
            const latestUpdateArray = latestUpdate.val();
            // setLatestOne(latestUpdateArray)

            const combinedData = filteredInactiveData.map(user => {
              const latestMessageObject = latestUpdateArray?.[user?.id];
              const latestMessage = latestMessageObject?.latestMessage || '';
              const senderId = latestMessageObject?.senderId || '';
              const seen = latestMessageObject?.seen || false;

              return {
                ...user,
                latestMessage,
                seen,
                senderId,
              };
            });
            // setUserData(filteredInactiveData)
            setCombinedDataState(combinedData)
          }
        }
        else {
          // If there are no chats, set combinedDataState to an empty array
          setCombinedDataState([]);
        }
        // setloader(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setloader(false);
      } finally {
        setloader(false);
      }
    // };

    // fetchData();
  };
  console.log('userDatauserData', userData)

  useFocusEffect(
    useCallback(() => {
      // setloader(true);
      setContactList(false)
      getData();
    }, []),
  );

  // console.log('combinedData', combinedData)

  const navigationFunc = async (item) => {
    const latestRef = database().ref(`latest/${item.id}/${AuthReducerID}`);
    const latestRef2 = database().ref(`latest/${AuthReducerID}/${item.id}`);

    await latestRef.update({
      seen: true,
    });
    await latestRef2.update({
      seen: true,
    });
    console.log('item in func', item)
    Navigation.navigate('ChatScreen', { userToken: item.id })
  }

  const navigationFuncNew = async (item) => {
    console.log('item in func', item)
    Navigation.navigate('ChatScreen', { userToken: item.id })
  }

  const handleLongPress = (item) => {
    // Handle long-press action here
    console.log('Long press detected on item:', item);
    setModalVisible(true)
    setSelectedItem(item); // Set the selected item when long press occurs
    // You can perform additional actions or navigate to another screen if needed
  };

  // console.log('contactlist', contactList)

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '5%',
            // marginVertical: '5%',
            marginBottom: '5%',
          }}>
          <Header header={'Chats'} screenName={true} />
        </View>
        {!contactList ? (
          <View
            style={{
              marginHorizontal: '5%',
              // marginVertical: '5%',
              // marginBottom: '7%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
            <Pressable
              onPress={() => {
                // Navigation.navigate('Drawer');
              }}>
              <Image
                source={require('../../Assets/Images/bottomPlusIconLight.png')}
                style={{
                  width: 30,
                  height: 30,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginHorizontal: 10
                }}
              />
              {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
            </Pressable>
            <Pressable
              onPress={() => {
                // Navigation.navigate('Drawer');
                setContactList(true)
              }}>
              <Image
                source={require('../../Assets/Images/bottomPlusIconColor.png')}
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
        ) : (
          <View
            style={{
              marginHorizontal: '5%',
              // marginVertical: '5%',
              // marginBottom: '7%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}>
            <Pressable
              onPress={() => {
                // Navigation.navigate('Drawer');
                setContactList(false)
              }}>
              <Image
                source={require('../../Assets/Images/cross.png')}
                style={{
                  width: 20,
                  height: 20,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                }}
              />
              {/* <MaterialIcons name="menu-open" size={30} color={'black'} /> */}
            </Pressable>
          </View>
        )
        }
      </>
    );
  };

  const renderItem = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigationFunc(item)}
          onLongPress={() => handleLongPress(item)}
        >
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
                    source={{ uri: item.profileImage ? `https://nextgenbulliontool.com${item.profileImage}` : null }}
                    style={{
                      width: 57,
                      height: 57,
                      borderRadius: 28.5,
                      borderColor: '#7D7D7D',
                      borderWidth: 2,
                      borderRadius: 55,
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
                  <View style={{ marginLeft: 2 }}>
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
                        Fontweight={item.senderId == AuthReducerID || item.seen ? 'normal' : 800}
                      // txtAlign={'center'}
                      />
                    </View>
                    <Heading
                      Heading={item.latestMessage}
                      Fontsize={14}
                      color={'rgba(156, 156, 156, 1)'}
                      Fontweight={item.senderId == AuthReducerID || item.seen ? 'normal' : 800}
                      // txtAlign={'center'}
                      mt={5}
                    />
                  </View>
                  <View
                    style={{
                      marginLeft: 20,
                      flexDirection: 'column',
                    }}>
                    {/* <View>
                      <Image
                        source={require('../../Assets/Images/notificationquantity.png')}
                      />
                    </View> */}
                  </View>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem2 = ({ item }) => {
    return (
      <>
        <TouchableOpacity
          onPress={() => navigationFuncNew(item)}
        // onLongPress={() => handleLongPress(item)}
        >
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
                    source={{ uri: item.profileImage ? `https://nextgenbulliontool.com${item.profileImage}` : null }}
                    style={{
                      width: 57,
                      height: 57,
                      borderRadius: 28.5,
                      borderColor: '#7D7D7D',
                      borderWidth: 2,
                      borderRadius: 55,
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
                  <View style={{ marginLeft: 2 }}>
                    <View
                      style={{
                        // flexDirection: 'row',
                        marginTop: 'auto',
                        marginBottom: 'auto',
                        marginLeft: 10
                      }}>
                      <Heading
                        Heading={item.display_name}
                        Fontsize={18}
                        //   color={COLORS.dark}
                        color={'rgba(16, 35, 78, 1)'}
                        Fontweight={'normal'}
                      // txtAlign={'center'}
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

  const ListEmptyComponent = () => {
    return (
      <View
        style={{
          // flex: 1,
          justifyContent: 'center',
          // alignItems: 'center', 
          // alignSelf: 'center', 
          // backgroundColor: 'pink', 
          // flexGrow: 1
          height: '100%'
        }}>
        <Image
          source={require('../../Assets/Images/nochat.png')}
          style={{
            width: 300,
            height: 300,
            alignContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
        />
      </View>
    )
  }

  console.log('combined data', combinedDataState)

  return (
    <>
      <ModalView
        set={setModalVisible}
        get={modalVisible}
        cross={() => setModalVisible(false)}
        txt={'Are you sure you want to delete?'}
        no={() => {
          setModalVisible(!modalVisible);
          setSelectedItem(null); // Clear the selected item when "No" is pressed
        }}
        yes={async () => {
          try {
            setModalVisible(!modalVisible);
            if (selectedItem) {

              // Remove the chat data from the 'latest' node
              await database().ref(`latest/${AuthReducerID}/${selectedItem.id}`).remove();
              await database().ref(`latest/${selectedItem.id}/${AuthReducerID}`).remove();
              await database().ref(`messages/${AuthReducerID}/${selectedItem.id}`).remove();
              await database().ref(`messages/${selectedItem.id}/${AuthReducerID}`).remove();

              // Optionally, you can remove the user from the 'users' node as well
              // await database().ref(`users/${item.id}`).remove();

              // Update the local state or refetch data if needed
              // setUserData(/* updated user data after removal */);

              console.log('Chat deleted successfully');
              getData();
            }
          } catch (error) {
            setModalVisible(!modalVisible);
            console.error('Error deleting chat:', error);
          }
          // Navigation.navigate('login');
          // removeDataToAsync('token');
          // removeDataToAsync('user');
          // dispatch(removeUserDataFromAsyncStorage());
        }}
      />
      <SafeArea style={{ flex: 1 }}>
        {loader ? (
          <Loader />
        ) : (
          contactList ? (
            <View
              style={{
                //   marginVertical: '5%',
                flex: 1,
                // justifyContent: 'center', // Center items vertically

                marginVertical: '5%',
                marginBottom: Platform.OS === 'ios' ? '13.5%' : '18%',
                // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                // borderBottomWidth: 1,
              }}>
              <FlatList
                data={allUsers}
                keyExtractor={item => item.id}
                renderItem={renderItem2}
                // keyExtractor={item => item.metal_id}
                contentContainerStyle={{
                  flexDirection: 'column',
                  paddingBottom: 70,
                  flexGrow: 1,
                  // flexGrow: 1, justifyContent: 'center'
                  // flex: 1, 
                  // justifyContent: 'center'
                }}
                ListHeaderComponent={ListHeaderComponent}
                // ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
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
          ) : (
            <View
              style={{
                //   marginVertical: '5%',
                flex: 1,
                // justifyContent: 'center', // Center items vertically

                marginVertical: '5%',
                marginBottom: Platform.OS === 'ios' ? '13.5%' : '18%',
                // borderBottomColor: 'rgba(0, 0, 0, 0.1)',
                // borderBottomWidth: 1,
              }}>
              <FlatList
                data={combinedDataState}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                // keyExtractor={item => item.metal_id}
                contentContainerStyle={{
                  flexDirection: 'column',
                  paddingBottom: 70,
                  flexGrow: 1,
                  // flexGrow: 1, justifyContent: 'center'
                  // flex: 1, 
                  // justifyContent: 'center'
                }}
                ListHeaderComponent={ListHeaderComponent}
                ListEmptyComponent={ListEmptyComponent} // Rendered when the list is empty
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
          )
        )}
      </SafeArea>
    </>
  );
}
