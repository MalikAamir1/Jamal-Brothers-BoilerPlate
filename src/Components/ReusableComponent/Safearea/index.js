import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {useSelector} from 'react-redux';

function SafeArea(props) {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      {props.children}
    </SafeAreaView>
  );
}

export default SafeArea;
