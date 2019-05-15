import { createSwitchNavigator, createAppContainer } from 'react-navigation'

import { MainScreen } from "./MainScreen";

const AppNavigator = createSwitchNavigator(
    {
        Main: {
            screen : MainScreen
        },
        // Add: {
        //     screen : Add
        // },
    },{
        initialRouteName: 'Main'
    }
)

const AppNav = createAppContainer(AppNavigator)

export default AppNav