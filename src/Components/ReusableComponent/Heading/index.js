import React, {useState} from 'react';
import {Headline} from 'react-native-paper';
// import FONT from '../../Assets/Style/Font';
// import COLORS from '../../../Assets/Style/Color';
// import {useSelector} from 'react-redux';

function Heading(props) {
  const {
    Stylefont,
    Fontweight,
    Fontsize,
    txtAlign,
    ml,
    mt,
    p,
    lh,
    Heading,
    mx,
    color,
    as,
    backgroundColor,
    borderRadius,
    aI,
    width,
    mv,
    mb,
  } = props;

  return (
    <Headline
      style={{
        // fontFamily: FONT.pop,
        fontStyle: Stylefont,
        fontWeight: Fontweight,
        fontSize: Fontsize,
        textAlign: txtAlign,
        marginLeft: ml,
        marginHorizontal: mx,
        marginTop: mt,
        padding: p,
        lineHeight: lh,
        color: color,
        alignItems: aI,
        alignSelf: as,
        backgroundColor: backgroundColor,
        borderRadius: borderRadius,
        width: width,
        marginVertical: mv,
        marginBottom: mb,
        // fontFamily: 'Poppins',
      }}>
      {Heading}
    </Headline>
  );
}

export default Heading;
