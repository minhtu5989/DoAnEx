import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { CameraScreen } from "./CameraScreen";
import { Home } from "./Home";
const AppNavigator = createSwitchNavigator(
    {
        HomeScreen: {
            screen : Home
        },
        CameraScreen: {
            screen : CameraScreen
        },
    },{
        initialRouteName: 'HomeScreen'
    }
)

const AppNav = createAppContainer(AppNavigator)

export default AppNav