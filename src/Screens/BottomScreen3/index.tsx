import {View} from 'react-native';
import Head from '../../Components/ReusableComponent/Head';
import { Header } from '../../Components/ReusableComponent/Header';

export default function BottomScreen3() {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'blue'}}>
        <View style={{marginTop: 50, marginHorizontal: 20}}>
          <Header header={'Screen 3'} />
        </View>
      </View>
    </>
  );
}
