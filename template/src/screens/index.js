import React, { Component } from 'react'
import { createSwitchNavigator } from 'react-navigation'
import { NavigationService } from '../api/NavigationService';
import { Box, Text } from 'react-native-design-utility';

// import { Menu } from "./FACE_ID/Menu";
import { NewFile } from "./FACE_ID/NewFile";
// import { List } from "./FACE_ID/List";
// import { Add } from "./FACE_ID/Add";
// import { Check } from "./FACE_ID/Check";

const AppNavigator = createSwitchNavigator(
    {
        Menu: {
            screen: NewFile
        },
        // List: {
        //     screen : List
        // },
        // Add: {
        //     screen : Add
        // },
        // Check: {
        //     screen : Check
        // },
    },{
        initialRouteName: 'Menu'
    }
)
export class Main extends Component {
    render() {
        return (
            <AppNavigator ref={ r => NavigationService.setTopLevelNavigator(r) } />
        )
    }
}
