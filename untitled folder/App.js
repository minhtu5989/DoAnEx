import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import Detector from './components/Detector';
import Main from "./src/Main"; 

const image_picker_options = {
  title: 'Chọn ảnh', 
  takePhotoButtonTitle: 'Chụp ảnh', 
  chooseFromLibraryButtonTitle: 'Chọn từ thư viện',
  cameraType: 'back', 
  mediaType: 'photo',
  maxWidth: 480,
  quality: 1, 
  noData: false, 
  path: 'images'
};

const api_key = 'f2b141059c814519b488dbabd5169e4b';


export default class App extends Component{
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <View style={styles.container}>
        {/* <Detector imagePickerOptions={image_picker_options} apiKey={api_key} /> */}
        <Main/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});


console.disableYellowBox = true
