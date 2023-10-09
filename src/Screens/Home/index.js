import {View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import {Header} from '../../Components/ReusableComponent/Header';

export default function Home() {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'pink'}}>
        <View style={{marginTop: 50, marginHorizontal: 20}}>
          <Header header={'Home'} />
        </View>
      </View>
    </>
  );
}
