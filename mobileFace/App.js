import React from 'react';
import { UtilityThemeProvider, Box, Text } from 'react-native-design-utility';
import { ActivityIndicator, SafeAreaView, StatusBar } from 'react-native';
import { NavigationService } from './src/api/NavigationService';
// import { Provider, } from 'mobx-react/native';

import { images } from './src/constants/images';
import { cacheImages } from './src/utils/cacheImages'
import { theme } from './src/constants/theme'
// import { store } from './src/stores';

// import AppNav from "./src/screens/index";
import AppNav from "@screens/index";

export default class App extends React.Component {
  state = {
    isReady: false,
  }

  componentDidMount(){
    this.cacheAssets()
  }

  cacheAssets = async () => {
    const imagesAssets = cacheImages([
      ...Object.values(images),
    ]);
    await Promise.all([...imagesAssets]);
    this.setState({ isReady: true });
  };

  render() {
    if(!this.state.isReady)
      return(
        <Box f={1} center bg='white'>
          <ActivityIndicator size='large'/>
        </Box>
      );
    return (
      // <Provider {...store}>
        <UtilityThemeProvider theme={theme}>
          <SafeAreaView style={{flex:1, backgroundColor: theme.color.white}}>
            <StatusBar barStyle='dark-content'/>
            <Box center f={1}>
                <AppNav ref={ r => NavigationService.setTopLevelNavigator(r) }/>
            </Box>
          </SafeAreaView>
        </UtilityThemeProvider>
      // </Provider>
    );
  }
}

// console.disableYellowBox = true
// console.ignoredYellowBox = ['Unrecognized WebSocket', `Warning: Can't call setState`];
