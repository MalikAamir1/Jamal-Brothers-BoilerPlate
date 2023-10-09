import {Platform, ScrollView, View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import Heading from '../../Components/ReusableComponent/Heading';

export const AboutApp = ({route}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'column',
          // justifyContent: 'space-between',
          flex: 1,
          marginVertical: '8%',
        }}>
        <View
          style={{
            marginBottom: 20,
            marginTop: Platform.OS === 'ios' ? 0 : '-5%',
          }}>
          <Head head={'About App'} />
        </View>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            marginTop: Platform.OS === 'ios' ? -10 : '-5%',
          }}>
          <View style={{marginHorizontal: '4%', marginTop: '10%'}}>
            <Heading
              //   Stylefont={'normal'}
              Fontweight={'bold'}
              Fontsize={18}
              Heading={'Nullam Porta Diam Id Dolar'}
              color={'#0B105C'}
            />
            <Heading
              Stylefont={'normal'}
              Fontsize={13}
              Heading={
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
              }
              color={'#7B869E'}
              mt={'4%'}
            />
          </View>
          <View style={{marginHorizontal: '4%', marginTop: '5%'}}>
            <Heading
              Fontweight={'bold'}
              Fontsize={18}
              Heading={'Nullam Porta Diam Id Dolar'}
              color={'#0B105C'}
            />
            <Heading
              Stylefont={'normal'}
              Fontsize={13}
              Heading={
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
              }
              color={'#7B869E'}
              mt={'4%'}
            />
          </View>
          <View style={{marginHorizontal: '4%', marginTop: '5%'}}>
            <Heading
              Fontweight={'bold'}
              Fontsize={18}
              Heading={'Nullam Porta Diam Id Dolar'}
              color={'#0B105C'}
            />
            <Heading
              Stylefont={'normal'}
              Fontsize={13}
              Heading={
                'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.'
              }
              color={'#7B869E'}
              mt={'4%'}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};
