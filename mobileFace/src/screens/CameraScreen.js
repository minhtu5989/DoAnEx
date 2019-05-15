import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FaceDetector,Camera,Permissions,Constants } from 'expo';
import { Box, Text } from 'react-native-design-utility'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { api } from "@api/ApiConfig";

export class CameraScreen extends React.Component {
  state = {
      hasCameraPermission:null,
      faces : []
    }

    // xin cấp quyền camera
    async componentWillMount() {
       const { status } =await Permissions.askAsync(Permissions.CAMERA);
       this.setState({hasCameraPermission:status==='granted'});
    }

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <Box center f={1} >
          <Camera
             style={styles.camera}
             type={'front'}
             onFacesDetected={this.handleFacesDetected}
             faceDetectorSettings={{
               mode: FaceDetector.Constants.Mode.fast,
               detectLandmarks: FaceDetector.Constants.Mode.none,
               runClassifications: FaceDetector.Constants.Mode.none,
             }}>
              <Box style={styles.topBar}>
                <Text style={styles.textcolor}>x: {this.state.faces.length ? this.state.faces[0].bounds.origin.x.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>y: {this.state.faces.length ? this.state.faces[0].bounds.origin.y.toFixed(0) : 0}</Text>
              </Box>
              <Box style={styles.bottomBar}>
                <Text style={styles.textcolor}>Heigth: {this.state.faces.length ? this.state.faces[0].bounds.size.height.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>width: {this.state.faces.length ? this.state.faces[0].bounds.size.width.toFixed(0) : 0}</Text>
              </Box>
              <Box style={{justifyContent: 'flex-end', flexDirection: 'row', padding: 5}}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 40,
                        backgroundColor: 'lightblue',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={() => this.snap(false)}>
                    <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                        {' '}Nạp ảnh{' '}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 40,
                        backgroundColor: 'red',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={this.handelEnroll} >
                    <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                        {' '}Nhận dạng{' '}
                    </Text>
                </TouchableOpacity>
              </Box>
             </Camera>
             { this.state.faces.length ? this.renderFaces() : undefined}
           
        </Box>
      );
    }
  }

  handelEnroll = async() => {
    let res = await api.Detect
          .url('/largepersongroups/tu-luong-marchine-learning/training')
          .headers({ "Ocp-Apim-Subscription-Key": "4f12445ce8f84307897b1673854ed6b1" })
          .get()
          .json();

          console.log(res);
          
    try {
      if (this.camera) {
          let photo = await this.camera.takePictureAsync({ base64: true });

          console.log('abc');

          if(!faceDetected) {
              console.log('Không có khuôn mặt nào !');
              return;
          }
          const userId = makeId();
          const { base64 } = photo;
          console.log('base64: ', base64 );
          console.log('photo: ', photo );
          console.log('userId: ', userId );

          

      }
  } catch (e) {
      console.log('error on snap: ', e)
  }
}

  renderFaces = () => (
    <Box style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </Box>
  )

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
      return (
        <Box
          key={faceID}
          transform={[
            { perspective: 600 },
            { rotateZ: `${rollAngle.toFixed(0)}deg` },
            { rotateY: `${yawAngle.toFixed(0)}deg` },
          ]}
          style={[
            styles.face,
            {
              ...bounds.size,
              left: bounds.origin.x,
              top: bounds.origin.y,
            },
          ]}>
          {
            console.log('Đã nhận ra khuôn mặt !')
            // console.log('data-Photo: ', this.state.faces)
          }
          <Text style={styles.faceText}>rollAngle: {rollAngle.toFixed(0)}</Text>
          <Text style={styles.faceText}>yawAngle: {yawAngle.toFixed(0)}</Text>
      </Box>
    );
  }
  
  handleFacesDetected = ({ faces }) => {
    if(faces.length>0){
      this.setState({ faces });
    }
  };


  //các method post API

  //const BASE_URL = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0';
  //const keyApi = 'f2b141059c814519b488dbabd5169e4b'
  //   //Enroll Method
  //   const enroll = async ({userId, base64}) => {
  //     const rawResponse = await fetch(`${BASE_URL}enroll`, {
  //         method: 'POST',
  //         headers: HEADERS,
  //         body: JSON.stringify({
  //             "image": base64,
  //             "subject_id": `MySocial_${userId}`,
  //             "gallery_name": "MyGallery"
  //         })
  //     });
  //     const content = await rawResponse.json();
  //     return content;
  //   }
  //   //Recognize Method
  //   const recognize = async (base64) => {
  //     const rawResponse = await fetch(`${BASE_URL}recognize`, {
  //         method: 'POST',
  //         headers: HEADERS,
  //         body: JSON.stringify({
  //             "image": base64,
  //             "gallery_name": "MyGallery"
  //         })
  //     });
  //     const content = await rawResponse.json();
  //     return content;
  //   }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    height: '90%',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
    width:wp('100%'),
    height: hp('100%')
  },
  topBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: Constants.statusBarHeight+1,
  },
  bottomBar: {
    flex: 0.2,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  face: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 1,
    position: 'absolute',
    borderColor: '#808000',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  faceText: {
    color: '#32CD32',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    backgroundColor: 'transparent',
  },
  facesContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    top: 0,
  },
  textcolor:{
    color: '#008080',
  }
});