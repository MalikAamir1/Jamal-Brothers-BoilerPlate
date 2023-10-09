import {
  FlatList,
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  // TouchableOpacity,
  View,
} from 'react-native';
import SafeArea from '../../Components/ReusableComponent/Safearea';
import Heading from '../../Components/ReusableComponent/Heading';
import {useState} from 'react';
import Head from '../../Components/ReusableComponent/Head';
import {useNavigation} from '@react-navigation/native';

export const Notifications = () => {
  const Navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [secondModal, setSecondModal] = useState(false);
  const [cardSelect, setCardSelect] = useState(false);
  const [selectedCard, setSelectedCard] = useState();

  const data = [
    {
      id: 1,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '02 min ago',
    },
    {
      id: 2,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '03 min ago',
    },
    {
      id: 3,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 4,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 5,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 6,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 7,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
    {
      id: 8,
      head: 'Report Lost Card',
      description: 'Lorem ipsum dolor sit amet, cons',
      time: '05 min ago',
    },
  ];

  const renderItem = ({item}) => {
    return (
      <>
        <View style={{flexDirection: 'row', marginLeft: 10}}>
          <View
            style={{
              borderBottomColor: 'rgba(156, 156, 156, 0.7)',
              borderRadius: 7,
              borderBottomWidth: 0.5,
              height: 69,
              //   width: 332,
              marginTop: 10,
            }}>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // marginTop: 40,
              }}>
              <View>
                <Image
                  source={require('../../Assets/Images/notificationIcon.png')}
                  style={{
                    // width: 25,
                    // height: 27,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    marginTop: -12,
                    marginLeft: -5,
                  }}
                />
              </View>
              <View style={{marginLeft: -10}}>
                <View
                  style={{
                    flexDirection: 'row',
                    // marginTop: 40,
                  }}>
                  <Heading
                    Heading={item.head}
                    Fontsize={16}
                    //   color={COLORS.dark}
                    Fontweight={'bold'}
                    txtAlign={'center'}
                  />
                  <Heading
                    Heading={item.time}
                    Fontsize={11}
                    //   color={COLORS.dark}
                    txtAlign={'center'}
                    color={'rgba(156, 156, 156, 1)'}
                    mt={5}
                    ml={10}
                  />
                </View>
                <Heading
                  Heading={item.description}
                  Fontsize={14}
                  color={'rgba(156, 156, 156, 1)'}
                  txtAlign={'center'}
                  mt={5}
                />
              </View>
              <View>
                <Image
                  source={require('../../Assets/Images/notificationquantity.png')}
                  style={{
                    // width: 25,
                    // height: 27,
                    alignContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const ListHeaderComponent = () => {
    return (
      <>
        <View
          style={{
            marginHorizontal: '1%',
            // marginVertical: '5%',
            marginBottom: 30,
          }}>
          <Head head={'Notifications'} />
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
            marginBottom: Platform.OS === 'ios' ? '10%' : '5%',
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
