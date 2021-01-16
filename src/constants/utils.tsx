import {Platform, Linking, Alert} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  check,
  RESULTS,
} from 'react-native-permissions';
export default {
  isAndroid: () => Platform.OS === 'android',
  handleCameraPermission: async (handle) => {
    const res = await check(PERMISSIONS.IOS.CAMERA);
    if (res === RESULTS.GRANTED) {
      handle(true);
    } else {
      Alert.alert(
        '카메라 권한 거절',
        '앱을 사용하기 위해서는 반드시 카메라 권한을 허용해야 합니다.\n 확인을 누르신 뒤 설정에서 카메라 권한을 켜십시오.',
        [
          {
            text: '취소',
            style: 'cancel',
          },
          {
            text: '확인',
            onPress: () => {
              Platform.OS === 'android'
                ? openSettings()
                : Linking.openURL('app-settings:');
            },
          },
        ],
      );
    }
  },
  appVersion: '2.1.2',
  miniPay: '8,720',
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
  },
};
