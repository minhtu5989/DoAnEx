import React, { Component } from 'react'
import { 
    StyleSheet, 
    Picker
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '@constants/theme';
// import { NavigationService } from '@api/NavigationService';
import { EvilIcons } from '@expo/vector-icons';
import Modal from 'react-native-modalbox';
import {Calendar} from 'react-native-calendars';

import { Detector } from "../components/Detector";
import { MyButton } from '@commons/MyButton';

const imagePickerOptions = {
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

export class ExampleScreen extends Component {
    constructor() {
        super();
        this.state = {
          isOpen: false,
          isDisabled: false,
          swipeToClose: true,
        };
      }
    
    onClose() {
    console.log('Modal just closed');
    }

    onOpen() {
    console.log('Modal just opened');
    }

    render() {
        return (
            <Box f={1} w={'100%'} h={'100%'} bg={theme.blueLight} center>
                
                
                <MyButton onPress={() => this.refs.modal1.open()} style={[styles.btn]} type='success'>
                        <Text> Modal </Text>
                </MyButton>
                
                <Box bg='lightblue'>
                    <Detector imagePickerOptions={imagePickerOptions} />
                </Box>




                <Modal 
                    ref={"modal1"}
                    backdropOpacity={0.4}
                    backdropColor="black"
                    isOpen={this.state.isOpen} 
                    onClosed={() => this.setState({isOpen: false})} 
                    style={styles.modal} 
                    position={"bottom"} 
                    // backdropContent={<Text>dsa</Text>}
                    animationDuration={500}
                    backButtonClose
                >
                    <Box center  bg='lightblue' dir='row' style={{borderTopLeftRadius: 20, borderTopRightRadius: 20, height: 200}}  >
                        <Text style={{textDecorationLine:'underline'}}>Môn học:</Text>
                        <Picker
                            selectedValue={this.state.obj}
                            style={{ height: 50, width: 100}}
                            mode="dropdown" //dropdown dialog
                            onValueChange={(itemValue, itemIndex) => this.setState({obj: itemValue})}>
                            <Picker.Item label="Nhập môn CNTT" value="nhapmon" />
                            <Picker.Item label="Big Data" value="bigdata" />
                            <Picker.Item label="Machine learning" value="machine" />
                        </Picker>
                    </Box>
                </Modal>
            </Box>
        );
    }
    
}

const styles = StyleSheet.create({

    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: 400
    },
      btn: {
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },

    text: {
        color: "black",
        fontSize: 22
    }

})












// import React from 'react';
// import Button from 'react-native-button';
// import Modal from 'react-native-modalbox';
// import Slider from 'react-native-slider';
// import { MyButton } from '@commons/MyButton';

// import {
//   AppRegistry,
//   Text,
//   StyleSheet,
//   ScrollView,
//   View,
//   Dimensions,
//   TextInput
// } from 'react-native';

// var screen = Dimensions.get('window');

// export default class App extends React.Component {

//   constructor() {
//     super();
//     this.state = {
//       isOpen: false,
//       isDisabled: false,
//       swipeToClose: true,
//       sliderValue: 0.3
//     };
//   }

//   onClose() {
//     console.log('Modal just closed');
//   }

//   onOpen() {
//     console.log('Modal just opened');
//   }

//   onClosingState(state) {
//     console.log('the open/close of the swipeToClose just changed');
//   }

//   renderList() {
//     var list = [];

//     for (var i=0;i<50;i++) {
//       list.push(<Text style={styles.text} key={i}>Elem {i}</Text>);
//     }

//     return list;
//   }
//   render() {
//     var BContent = <Button onPress={() => this.setState({isOpen: false})} style={[styles.btn, styles.btnModal]}>X</Button>;

//     return (
//       <View style={styles.wrapper}>
//         <Button onPress={() => this.refs.modal1.open()} style={styles.btn}>Basic modal</Button>
//         <Button onPress={() => this.refs.modal2.open()} style={styles.btn}>Position top</Button>
//         <Button onPress={() => this.refs.modal3.open()} style={styles.btn}>Position centered + backdrop + disable</Button>
//         <Button onPress={() => this.refs.modal4.open()} style={styles.btn}>Position bottom + backdrop + slider</Button>
//         <Button onPress={() => this.setState({isOpen: true})} style={styles.btn}>Backdrop + backdropContent</Button>
//         <Button onPress={() => this.refs.modal6.open()} style={styles.btn}>Position bottom + ScrollView</Button>
//         <Button onPress={() => this.refs.modal7.open()} style={styles.btn}>Modal with keyboard support</Button>

//         <Modal
//           style={[styles.modal, styles.modal1]}
//           ref={"modal1"}
//           swipeArea={50}
//           swipeToClose={this.state.swipeToClose}
//           onClosed={this.onClose}
//           onOpened={this.onOpen}
//           onClosingState={this.onClosingState}>
//             <Text style={styles.text}>Basic modal</Text>
//             {/*<ScrollView>
//               <View 
//                 style={{width: screen.width, paddingLeft: 10}}>
//                 {this.renderList()}
//               </View>
//             </ScrollView> */}
//             <Button onPress={() => this.setState({swipeToClose: !this.state.swipeToClose})} style={styles.btn}>Disable swipeToClose({this.state.swipeToClose ? "true" : "false"})</Button>
//         </Modal>

//         <Modal style={[styles.modal, styles.modal2]} backdrop={false}  position={"top"} ref={"modal2"}>
//           <Text style={[styles.text, {color: "white"}]}>Modal on top</Text>
//         </Modal>

//         <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
//           <Text style={styles.text}>Modal centered</Text>
//           <Button onPress={() => this.setState({isDisabled: !this.state.isDisabled})} style={styles.btn}>Disable ({this.state.isDisabled ? "true" : "false"})</Button>
//         </Modal>

//         <Modal style={[styles.modal, styles.modal4]} position={"bottom"} ref={"modal4"}>
//           <Text style={styles.text}>Modal on bottom with backdrop</Text>
//           <Slider style={{width: 200}} value={this.state.sliderValue} onValueChange={(value) => this.setState({sliderValue: value})} />
//         </Modal>

//         <Modal isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})} style={[styles.modal, styles.modal4]} position={"center"} backdropContent={BContent}>
//           <Text style={styles.text}>Modal with backdrop content</Text>
//         </Modal>

//         <Modal 
//           style={[styles.modal, styles.modal4]} 
//           position={"bottom"}
//           backdrop={false} 
//           ref={"modal6"} 
//           swipeArea={20}
//           swipeToClose={true}
//           backButtonClose={true}>
//           <View 
//             style={{width: screen.width, paddingLeft: 10}}>
//             <Button onPress={() => this.refs.modal7.open()} style={styles.btn}>Modal with keyboard support</Button>
//             <Button onPress={() => this.refs.modal4.open()} style={styles.btn}>Position bottom + backdrop + slider</Button>
//           </View>
//           <ScrollView horizontal={true}>
//             {this.renderList()}
//           </ScrollView>
//         </Modal>

//         <Modal ref={"modal7"} style={[styles.modal, styles.modal4]} position={"center"}>
//           <View>
//             <TextInput style={{height: 50, width: 200, backgroundColor: '#DDDDDD'}}/>
//           </View>
//         </Modal>
//       </View>
//     );
//   }

// }

// const styles = StyleSheet.create({

//   wrapper: {
//     paddingTop: 50,
//     flex: 1
//   },

//   modal: {
//     justifyContent: 'center',
//     alignItems: 'center'
//   },

//   modal2: {
//     height: 230,
//     backgroundColor: "#3B5998"
//   },

//   modal3: {
//     height: 300,
//     width: 300
//   },

//   modal4: {
//     height: 300
//   },

//   btn: {
//     margin: 10,
//     backgroundColor: "#3B5998",
//     color: "white",
//     padding: 10
//   },

//   btnModal: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     width: 50,
//     height: 50,
//     backgroundColor: "transparent"
//   },

//   text: {
//     color: "black",
//     fontSize: 22
//   }

// });