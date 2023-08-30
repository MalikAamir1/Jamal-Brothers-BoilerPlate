import React, {useRef} from 'react';
import {View, Button, Pressable} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
// import COLORS from '../../../Assets/Style/Color';
import SafeArea from '../Safearea';

export default function BottomSheet(props) {
  return (
    <SafeArea>
      <RBSheet
        ref={props.refRBSheets}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={props.height}
        customStyles={{
          draggableIcon: {
            backgroundColor: '#000',
          },
          container: {
            // backgroundColor: COLORS.bgcolor,
            elevation: 2,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            alignSelf: 'center',
          },
        }}>
        {props.children}
      </RBSheet>
      {/* </ScrollView> */}
    </SafeArea>
  );
}
