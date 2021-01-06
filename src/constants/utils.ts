import { Platform } from 'react-native';

export default {
    isAndroid: () => Platform.OS === "android",
    appVersion: '1.2.7',
    miniPay: "8590",
    calculateDay: 23,
    renderWeekDay: (weekDay) => {
        switch (weekDay) {
            case '0':
                return '일요일';
            case '1':
                return '월요일';
            case '2':
                return '화요일';
            case '3':
                return '수요일';
            case '4':
                return '목요일';
            case '5':
                return '금요일';
            case '6':
                return '토요일';
            default:
                break;
        }
    }
};
