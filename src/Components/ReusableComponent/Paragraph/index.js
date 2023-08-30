import React, {useState} from 'react';
import {Paragraph} from 'react-native-paper';
// import COLORS from '../../../Assets/Style/Color';

function InteractParagraph(props) {
  // const [isdark, setisDark] = useState(reducerData?.isDark?.isdark);

  const {
    pWidth,
    Direction,
    pAlign,
    txtAlign,
    ml,
    mt,
    p,
    fw,
    fs,
    mv,
    mb,
    txt_color,
    Padding,
    mr,
  } = props;

  return (
    <Paragraph
      // numberOfLines={props.line ? props.line : null}
      numberOfLines={props.line ? props.line : null}
      // ellipsizeMode="tail"
      style={{
        width: pWidth,
        flexDirection: Direction,
        alignItems: pAlign,
        justifyContent: props.JContent,
        textAlign: txtAlign,
        marginLeft: ml,
        marginRight: mr,
        marginTop: mt,
        marginVertical: mv,
        marginBottom: mb,
        lineHeight: props.lh,
        fontWeight: fw,
        fontSize: fs,
        padding: Padding,
        // color: props.color ? props.color : COLORS.txt_color,
      }}>
      {p}
    </Paragraph>
  );
}

export default InteractParagraph;
