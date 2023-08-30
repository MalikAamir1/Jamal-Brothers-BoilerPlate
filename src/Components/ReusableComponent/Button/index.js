import React, {useState} from 'react';
import {Button, Text} from 'react-native-paper';
import {ImageBackground, Pressable, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

function ButtonComp(props) {
  let {btnText, press} = props;

  return (
    // <Pressable
    //   style={{
    //     alignItems: props.align,
    //     justifyContent: props.justify,
    //     // backgroundColor: props.bgColor ? props.bgColor : 'transparent',
    //     // width: props.viewWidth,
    //   }}
    //   disabled={props.enable}
    //   onPress={props.press}>
    //   <ImageBackground
    //     source={require('../../../Assets/Images/CTA.png')}
    //     resizeMode={'contain'}
    //     style={{width: '100%', alignContent: 'center', alignItems: 'center'}}>
    //     <Button
    //       mode={props.mode ? props.mode : 'contained'}
    //       color={props.color}
    //       disabled={props.enable}
    //       labelStyle={{
    //         // textAlign: 'center',
    //         fontFamily: FONT.pop,
    //         fontSize: props.fontSize,
    //         fontWeight: props.fontStyle,
    //         marginTop: props.txtRightMargin,
    //         marginLeft: props.txtLeftMargin,
    //         marginRight: props.Rightmargin,
    //         color: props.txtColor,
    //         width: props.txtwidth,
    //       }}
    //       dark={true}
    //       uppercase={false}
    //       style={{
    //         height: props.btnHeight,
    //         width: props.btnwidth,
    //         borderRadius: props.radius,
    //         justifyContent: props.justify,
    //         alignItems: props.txtalign,
    //         marginRight: props.rightMargin,
    //         marginLeft: props.leftMargin,
    //         marginTop: props.topMargin,
    //         shadowColor: props.shadow,
    //         borderColor: reducerData?.isDark?.isdark
    //           ? COLORS.white
    //           : COLORS.border_color,
    //         borderWidth: props.Borderwidth,
    //         backgroundColor: props.bgcolor,
    //       }}
    //       // theme={}
    //       // onPress={props.press}
    //     >
    //       {props.icon && (
    //         <Icon
    //           name={props.icon}
    //           color={props.IconColor}
    //           size={props.iconSize ? props.iconSize : 28}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //       {props.featherIcon ? (
    //         <Feather
    //           name={props.featherIcon}
    //           size={props.iconSize ? props.iconSize : 28}
    //         />
    //       ) : (
    //         <></>
    //       )}
    //       <Text
    //         style={{fontWeight: 'bold', fontSize: 18, color: props.txtColor}}>
    //         {btnText}
    //       </Text>
    //     </Button>
    //   </ImageBackground>
    // </Pressable>

    <LinearGradient
      colors={['#BA7607', '#EDCC45']}
      style={{
        flex: 1,
        // padding: 13,
        marginLeft: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
      }}>
      <TouchableOpacity
        onPress={press}
        style={{
          flex: 1,
          width: '100%',
          padding: 12,
          alignItems: 'center',
          height: '50%',
        }}>
        <Text style={{color: '#FFFFFF', fontSize: 18, fontWeight: 'bold'}}>
          {btnText}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

export default ButtonComp;
