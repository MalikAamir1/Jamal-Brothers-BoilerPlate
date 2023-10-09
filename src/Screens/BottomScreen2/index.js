import {View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import {Header} from '../../Components/ReusableComponent/Header';

export default function BottomScreen2() {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'green'}}>
        <View style={{marginTop: 50, marginHorizontal: 20}}>
          <Header header={'Screen 2'} />
        </View>
      </View>
    </>
  );
}
