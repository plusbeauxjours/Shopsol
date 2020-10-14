import { Platform } from 'react-native';

export default {
    isAndroid: () => Platform.OS === "android",
    appVersion: '2.0.7',
    miniPay: "8590",
    calculateDay: 23,
    avatarUrl: (gender) => `http://133.186.210.223/uploads/${gender == '0' ? '1.png' : '2.png'}`
};

