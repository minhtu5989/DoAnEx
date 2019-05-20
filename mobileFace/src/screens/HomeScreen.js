import React, { Component } from 'react'
import { 
    Dimensions, 
    Image,
    Alert,
    Platform,
    StyleSheet, 
    TouchableOpacity 
} from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import { theme } from '@constants/theme';
import { Picker } from 'react-native';

import { NavigationService } from '@utils/NavigationService';
import { MyButton } from '@commons/MyButton';
import { api } from '@api/ApiConfig';

// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { inject, observer } from 'mobx-react/native';


export class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            obj: 'nhapmon'
        };
    }

    onClick = async() => {
        NavigationService.navigate('CameraScreen');
    }        

    handleCreateClass =  async() => {
        res = await api.StatusTranning
        .url(`${this.state.obj}`)
        .headers({ 
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": `${api.keyApi}` })
        .put({
            "name": "Tu Luong teacher",
            "userData": "Machine learning",
            "recognitionModel": "recognition_02"
        })
        .json();

        console.log('res:', res);
    }

    render() {
        return (
            <Box f={1} bg='lightblue' w={'100%'} h={'100%'} center>
                <MyButton type='success' onPress={this.onClick} >
                    <Text>--> Camara</Text>
                </MyButton>

                <Box mt='lg' center dir='row'>
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

                <MyButton center type='success' onPress={this.handleCreateClass} mt='xm'>
                    <Text>Tạo lớp</Text>
                </MyButton>
            </Box>
        );
    }
}
