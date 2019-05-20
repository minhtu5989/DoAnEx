import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { CameraScreen } from "./CameraScreen";
import { ExampleScreen } from "./ExampleScreen";
import { HomeScreen } from "./HomeScreen";
import { testCam } from "./testCam";

const AppNavigator = createSwitchNavigator(
    {
        HomeScreen: {
            screen : HomeScreen
        },
        CameraScreen: {
            screen : CameraScreen
        },
        ExampleScreen: {
            screen : ExampleScreen
        },
        testCam: {
            screen : testCam
        },
    },{
        initialRouteName: 'testCam'
    }
)

const AppNav = createAppContainer(AppNavigator)

export default AppNav