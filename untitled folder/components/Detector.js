import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
 
import ImagePicker from "react-native-image-picker";
 
import Button from './Button';
 
import RNFetchBlob from 'react-native-fetch-blob';
 
import _ from 'lodash';


export default class Detector extends Component {
  constructor(props) {
      super(props);
    this.state = {
        photo_style: {
            position: 'relative',
            width: 480,
            height: 300
        },
        has_photo: false,
        photo: null,
        face_data: null
    };
  }
 
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Image
              style={this.state.photo_style}
              source={this.state.photo}
              resizeMode={"contain"}
          >
              { this._renderFaceBoxes .call(this) }
          </Image>
        </View>
        <View style={{flex:1}}>
          <Button
              text="Chọn ảnh"
              onpress={this._pickImage.bind(this)}
              button_styles={styles.button}
              button_text_styles={styles.button_text} 
          />
  
          { this._renderDetectFacesButton.call(this) }
        </View>
 
      </View>
    );
  }
 
 
  _pickImage() {
     
    this.setState({
        face_data: null
    });
 
    ImagePicker.showImagePicker(this.props.imagePickerOptions, (response) => {
         
      if(response.error){
        alert('Không tìm thấy ảnh. Vui lòng thử lại');
      }else{
         
        let source = {uri: response.uri};
 
        this.setState({
          photo_style: {
            position: 'relative',
            width: response.width,
            height: response.height
          },
          has_photo: true,
          photo: source,
          photo_data: response.data
        });
        // alert(JSON.stringify(response.data))
      }
    });
 
  }
 
  _renderDetectFacesButton() {
    if(this.state.has_photo){
        return  (
            <Button
                text="Nhận diện"
                onpress={this._detectFaces.bind(this)}
                button_styles={styles.button}
                button_text_styles={styles.button_text} />
        );
    }
  }
 
  _detectFaces() {
    //                         https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age
    //                         https://api.projectoxford.ai/face/v1.0
    //                         https://westcentralus.api.cognitive.microsoft.com/face/v1.0
    RNFetchBlob.fetch('POST', 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age', {
        'Accept': 'application/json',
        'Content-Type': 'application/octet-stream',
        'Ocp-Apim-Subscription-Key': 'f2b141059c814519b488dbabd5169e4b'
    }, this.state.photo_data)
    .then((res) => {
        al
        return res.json();      
    })
    .then((json) => {
         alert(json)
        if(json.length){
            this.setState({
                face_data: json
            });
        }else{
            alert("Xin lỗi ! Tôi không tìm thấy khuôn mặt nào");
        }
        alert(JSON.stringify(this.state.face_data))
        return json;
    })
    .catch (function (error) {
        console.log(error);
        alert('Sorry, the request failed. Please try again.' + JSON.stringify(error));
    });
     
 
  }
 
  _renderFaceBoxes () {
 
    if(this.state.face_data){
 
        let views = _.map(this.state.face_data, (x) => {
             
            let box = {
                position: 'absolute',
                top: x.faceRectangle.top,
                left: x.faceRectangle.left
            };
 
            let style = { 
                width: x.faceRectangle.width,
                height: x.faceRectangle.height,
                borderWidth: 2,
                borderColor: '#fff',
            };
             
            let attr = {
                color: '#fff',
            };
 
            return (
                <View key={x.faceId} style={box}>
                    <View style={style}></View>
                    <Text style={attr}>{x.faceAttributes.gender}, {x.faceAttributes.age} y/o</Text>
                </View>
            );
        });
 
        return <View>{views}</View>
    }
 
  }
   
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#ccc'
  },
  button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  button_text: {
    color: '#FFF',
    fontSize: 20
  }
});
 