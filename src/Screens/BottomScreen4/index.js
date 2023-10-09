import {View} from 'react-native';
import {Header} from '../../Components/ReusableComponent/Header';

export default function BottomScreen4() {
  return (
    <>
      <View style={{flex: 1, backgroundColor: 'yellow'}}>
        <View style={{marginTop: 50, marginHorizontal: 20}}>
          <Header header={'Screen 4'} />
        </View>
      </View>
    </>
  );
}
