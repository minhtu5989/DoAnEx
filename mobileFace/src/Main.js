import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FaceDetector,Camera,Permissions,Constants } from 'expo';

const detect = '/detect[?returnFaceId][&returnFaceLandmarks][&returnFaceAttributes][&recognitionModel][&returnRecognitionModel]'

export class Main extends React.Component {
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
        <View style={styles.container}>
          <Camera
             style={styles.camera}
             type={'front'}
             onFacesDetected={this.handleFacesDetected}
             faceDetectorSettings={{
               mode: FaceDetector.Constants.Mode.fast,
               detectLandmarks: FaceDetector.Constants.Mode.none,
               runClassifications: FaceDetector.Constants.Mode.none,
             }}>
              <View style={styles.topBar}>
                <Text style={styles.textcolor}>x: {this.state.faces.length ? this.state.faces[0].bounds.origin.x.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>y: {this.state.faces.length ? this.state.faces[0].bounds.origin.y.toFixed(0) : 0}</Text>
              </View>
              <View style={styles.bottomBar}>
                <Text style={styles.textcolor}>Heigth: {this.state.faces.length ? this.state.faces[0].bounds.size.height.toFixed(0) : 0}</Text>
                <Text style={styles.textcolor}>width: {this.state.faces.length ? this.state.faces[0].bounds.size.width.toFixed(0) : 0}</Text>
              </View>
              <View style={{justifyContent: 'flex-end', flexDirection: 'row', padding: 5}}>
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
                    onPress={() => this.snap(true)}>
                    <Text
                        style={{ fontSize: 18, marginBottom: 10, color: 'black' }}>
                        {' '}Nhận dạng{' '}
                    </Text>
                </TouchableOpacity>
              </View>
             </Camera>
             { this.state.faces.length ? this.renderFaces() : undefined}
           
        </View>
      );
    }
  }

  snap = async (recognize) => {
    try {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync({ base64: true });
            if(!faceDetected) {
                alert('Không có khuôn mặt nào !');
                return;
            }
            
            const userId = makeId();
            const { base64 } = photo;

            this[recognize ? 'recognize' : 'enroll']({ userId, base64 });
        }
    } catch (e) {
        console.log('error on snap: ', e)
    }
};

  renderFaces = () => (
    <View style={styles.facesContainer} pointerEvents="none">
      {this.state.faces.map(this.renderFace)}
    </View>
  )

  renderFace({ bounds, faceID, rollAngle, yawAngle }) {
      return (
        <View
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
      </View>
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
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'space-between',
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