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

import { NavigationService } from '@api/NavigationService';
import { MyButton } from '@commons/MyButton';

// import { NavigationService } from '@api/NavigationService';
// import { EvilIcons, MaterialIcons } from '@expo/vector-icons';
// import { inject, observer } from 'mobx-react/native';


export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }

    onClick = () => {
        NavigationService.navigate('CameraScreen');
    }        

    render() {
        return (
            <Box f={1} bg={theme.blueLight} center>
                <Text>this is Home</Text>
                <Box center w={200} h={50} m='sm'>
                    <MyButton center type='success' onPress={this.onClick}>
                        <Text>--> Camara</Text>
                    </MyButton>
                </Box>
            </Box>
        );
    }
}
