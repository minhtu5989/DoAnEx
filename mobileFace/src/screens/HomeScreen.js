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

import {Calendar, LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['vn'] = {
    monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
    monthNamesShort: ['Một','Hai','Ba','Bốn','Năm','Sáu','Bảy','Tám','Chín','Mười','Mười một','Mười hai'],
    dayNames: ['Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7','Chủ nhật'],
    dayNamesShort: ['Hai.','Ba','Tư','Năm','Sáu','Bảy','CN'],
    // today: 'Aujourd\'hui'
  };

LocaleConfig.defaultLocale = 'vn';

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

    _calendar = () => {
        return (
            <Box center f={1} bg='red'>
                <Calendar
                    style={{
                        borderWidth: 1,
                        borderColor: 'gray',
                        height: 350
                      }}
                      // Specify theme properties to override specific styles for calendar parts. Default = {}
                      theme={{
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        textSectionTitleColor: '#b6c1cd',
                        selectedDayBackgroundColor: '#00adf5',
                        selectedDayTextColor: '#ffffff',
                        todayTextColor: '#00adf5',
                        dayTextColor: '#2d4150',
                        textDisabledColor: '#d9e1e8',
                        dotColor: '#00adf5',
                        selectedDotColor: '#ffffff',
                        arrowColor: 'orange',
                        monthTextColor: 'blue',
                        indicatorColor: 'blue',
                        textDayFontFamily: 'monospace',
                        textMonthFontFamily: 'monospace',
                        textDayHeaderFontFamily: 'monospace',
                        textDayFontWeight: '300',
                        textMonthFontWeight: 'bold',
                        textDayHeaderFontWeight: '300',
                        textDayFontSize: 16,
                        textMonthFontSize: 16,
                        textDayHeaderFontSize: 16
                      }}

                    // Initially visible month. Default = Date()
                    current={'2012-03-01'}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={'2012-05-30'}
                    // Handler which gets executed on day press. Default = undefined
                    onDayPress={(day) => {console.log('selected day', day)}}
                    // Handler which gets executed on day long press. Default = undefined
                    onDayLongPress={(day) => {console.log('selected day', day)}}
                    // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
                    monthFormat={'yyyy MM'}
                    // Handler which gets executed when visible month changes in calendar. Default = undefined
                    onMonthChange={(month) => {console.log('month changed', month)}}
                    // Hide month navigation arrows. Default = false
                    hideArrows={true}
                    // Replace default arrows with custom ones (direction can be 'left' or 'right')
                    renderArrow={(direction) => (<Arrow />)}
                    // Do not show days of other months in month page. Default = false
                    hideExtraDays={true}
                    // If hideArrows=false and hideExtraDays=false do not switch month when tapping on greyed out
                    // day from another month that is visible in calendar page. Default = false
                    disableMonthChange={true}
                    // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday.
                    firstDay={1}
                    // Hide day names. Default = false
                    hideDayNames={true}
                    // Show week numbers to the left. Default = false
                    showWeekNumbers={true}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go back month
                    onPressArrowLeft={substractMonth => substractMonth()}
                    // Handler which gets executed when press arrow icon left. It receive a callback can go next month
                    onPressArrowRight={addMonth => addMonth()}
                />
            </Box>
        )
    }

    render() {
        return (
            <Box f={1} bg='lightblue' w={'100%'} h={'100%'} center>
                <MyButton type='success' onPress={this.onClick} >
                    <Text>--> Camara</Text>
                </MyButton>

                {this.Calendar}

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
