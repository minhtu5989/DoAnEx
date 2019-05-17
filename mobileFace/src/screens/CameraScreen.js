import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FaceDetector,Camera,Permissions,Constants } from 'expo';
import { Box, Text } from 'react-native-design-utility'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { api } from "@api/ApiConfig";

export class CameraScreen extends React.Component {
  state = {
      hasCameraPermission:null,
      type: Camera.Constants.Type.front,
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
             type={this.state.type}
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

              {/* change 'back' or front camera */}
              <Box
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  flexDirection: 'row',
                  justifyContent:'flex-end',
                  marginRight: 15
                }}>
                <TouchableOpacity
                  style={{
                    flex: 0.1,
                    alignSelf: 'flex-end',
                    // alignItems: 'center',
                  }}
                  onPress={() => {
                    this.setState({
                      type: this.state.type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back,
                    });
                  }}>
                    <MaterialCommunityIcons name="camera-party-mode" color="white" size={40} />
                </TouchableOpacity>
              </Box>

              {/* btn Enroll & Recognize */}
              <Box style={{justifyContent: 'flex-end', flexDirection: 'row', padding: 5}}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 40,
                        backgroundColor: 'lightblue',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                    onPress={this.handle}>
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
                    onPress={() => this.snap(true)}>
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

  handle = async() => {
    

    try {
      if (this.camera) {
          let photo = await this.camera.takePictureAsync({ base64: true });
          if(!faceDetected) {
              alert('No face detected!');
              return;
          }
          let res1 = await api.StatusTranning
          .url('/tu-luong-marchine-learning/training')
          .headers({ "Ocp-Apim-Subscription-Key": `${api.keyApi}` })
          .get()
          .json();

          console.log('res1111:', res1);
          // let res2 = await api.Detect
          // .url('?returnFaceId=true&returnFaceAttributes=age,gender,smile,emotion,makeup,accessories,exposure&recognitionModel=recognition_02&returnRecognitionModel=true')
          // .headers({ 
          //   "Ocp-Apim-Subscription-Key": `${api.keyApi}`,
          //   "Content-Type": "application/octet-stream"
          // })
          // .post(
          //     `${api.base64}`
          // )
          // .json();

          // console.log('res2:', res2);

          const userId = makeId();
          const { base64, uri } = photo;
          console.log('photo: ', photo);
          console.log('base64: ', base64);
          console.log('uri: ', uri);
          
          this[recognize ? 'recognize' : 'enroll']({ userId, base64 });
      }
  } catch (e) {
      console.log('error on snap: ', e)
  }
  }


  snap = async (recognize) => {

    let res1 = await api.StatusTranning
    .url('/tu-luong-marchine-learning/training')
    .headers({ "Ocp-Apim-Subscription-Key": `${api.keyApi}` })
    .get()
    .json();

    console.log('res1:', res1);

    
    
    // try {
        // if (this.camera) {
            let photo = await this.camera.takePictureAsync({ base64: true });
            if(!faceDetected) {
                alert('No face detected!');
                return;
            }
            // let res2 = await api.Detect
            // .url('?returnFaceId=true&returnFaceAttributes=age,gender,smile,emotion,makeup,accessories,exposure&recognitionModel=recognition_02&returnRecognitionModel=true')
            // .headers({ 
            //   "Ocp-Apim-Subscription-Key": `${api.keyApi}`,
            //   "Content-Type": "application/octet-stream"
            // })
            // .post(
            //     `${api.base64}`
            // )
            // .json();

            console.log('res2:', res2);

            const userId = makeId();
            const { base64 } = photo;
            console.log('photo: ', photo);
            console.log('base64: ', base64);
            
            // this[recognize ? 'recognize' : 'enroll']({ userId, base64 });
        // }
    // } catch (e) {
    //     console.log('error on snap: ', e)
    // }
};

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