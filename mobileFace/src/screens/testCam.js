import {ImagePicker, Permissions, Expo, PixelRatio} from 'expo';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, CameraRoll, Platform } from 'react-native';

export class testCam extends React.Component {
  state = {
    imgUri: '',
    topText: '',
    bottomText: '',
  }

  componentWillMount = async() => {
    const { status } =await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission:status==='granted'});
    this.askPermission()
 }

 askPermission = async () => {
    // only if user allows permission to camera roll
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  // const { onStartUpload } = this.props;
    // On Android users are prompted every time,
    // so no need to show additional Alert
    if (status !== 'granted') {
      if (Platform.OS === 'ios') this.showAlert();
      return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Nhận diện khuôn mặt</Text>
        
        <Image ref={(ref) => this.imageView = ref}
          style={{ width: 300, height: 300, backgroundColor: '#dddddd' }}
          source={{ uri: this.state.imgUri }}
        />
        
        <View style={{ flexDirection: 'column', flex: 1, width: '100%' }}>
        
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'lightblue'}]}
            onPress={this._onChoosePic}>
            <Text style={styles.buttonText}>Chọn ảnh</Text>
          </TouchableOpacity> 

          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'yellow'}]}
            onPress={this._onTakePic}>
            <Text style={styles.buttonText}>Chụp ảnh</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, {backgroundColor: 'green'}]}
            onPress={this._onSave}>
            <Text style={styles.buttonText}>Lưu ảnh</Text>
          </TouchableOpacity>
          
        </View>
      </View>
    );
  }
  
  
  _onChoosePic = async () => {
    const {
      cancelled,
      uri,
    } = await ImagePicker.launchImageLibraryAsync({allowsEditing: true});
    if (!cancelled) {
      this.setState({ imgUri: uri });
      console.log("on Choose: ",uri) // this logs correctly
      // TODO: why isn't this showing up inside the Image on screen?
    }
  }

  _onTakePic = async () => {
    const {
      cancelled,
      uri,
    } = await ImagePicker.launchCameraAsync({});
    if (!cancelled) {
      this.setState({ imgUri: uri });
      alert("on Take: ",imgUri) // this logs correctly
    }
  }

  _onSave = async () => {

    const targetPixelCount = 1080; // If you want full HD pictures
    const pixelRatio = PixelRatio.get(); // The pixel ratio of the device
    const pixels = targetPixelCount / pixelRatio;
    
    const result = await takeSnapshotAsync(this.imageView, {
      result: 'file',
      height: pixels,
      width: pixels,
      quality: 1,
      format: 'png',
    });

    await CameraRoll.saveToCameraRoll(result);
    this.setState({ imgUri: result });
    console.log("on Save: ",this.state.imgUri) // this logs correctly
    // TODO: show confirmation that it was saved (flash the word saved across bottom of screen?)
  }
}


const styles = StyleSheet.create({
  text: {
    fontSize: 28,
    margin: 20,
  },
  buttonText: {
    fontSize: 21,
  },
  button: {
    justifyContent: 'center',
    alignItems:'center',
    height: 50,
    width: 150,
    margin: 10,
    marginBottom: 10,
    
  },
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
});
