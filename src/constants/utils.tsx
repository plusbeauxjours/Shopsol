import {Platform, Linking, Alert, PermissionsAndroid} from 'react-native';
import {
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import Geolocation from 'react-native-geolocation-service';

export default {
  isAndroid: () => Platform.OS === 'android',
  getOCRImage: (uri) => {
    const getUri = (uri) => {
      return uri !== null &&
        uri !== undefined &&
        uri?.includes('/') &&
        uri?.includes('.')
        ? uri
        : '';
    };
    if (!uri?.includes('https://wesop.s3.ap-northeast-2.amazonaws.com')) {
      return `http://shopsolapi.shop-sol.com/uploads/ocr/${uri}`;
    } else {
      return getUri(uri);
    }
  },
  getQRImage: (uri) => {
    const getUri = (uri) => {
      return uri !== null &&
        uri !== undefined &&
        uri?.includes('/') &&
        uri?.includes('.')
        ? uri
        : '';
    };
    if (!uri?.includes('https://wesop.s3.ap-northeast-2.amazonaws.com')) {
      return `http://shopsolapi.shop-sol.com/${uri}`;
    } else {
      return getUri(uri);
    }
  },
  getUriImage: (uri) => {
    const getUri = (uri) => {
      return uri !== null &&
        uri !== undefined &&
        uri?.includes('/') &&
        uri?.includes('.')
        ? uri
        : '';
    };
    if (uri?.includes('http://gs1.koreannet.or.kr/')) {
      return getUri(uri);
    } else if (
      !uri?.includes('https://wesop.s3.ap-northeast-2.amazonaws.com')
    ) {
      return `http://shopsolapi.shop-sol.com/uploads/${uri}`;
    } else {
      return getUri(uri);
    }
  },
  handleCameraPermission: async (handle) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
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
                  openSettings();
                },
              },
            ],
          );
        }
      } else {
        const permission = await request(PERMISSIONS.IOS.CAMERA);
        if (permission === RESULTS.GRANTED) {
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
                  Linking.openURL('app-settings:');
                },
              },
            ],
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
  },
  handleLocationPermission: async (
    setLat,
    setLong,
    handle = (boolean) => {},
  ) => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          Geolocation.getCurrentPosition(
            (position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
            },
            (e) => {
              console.log(e);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              distanceFilter: 100,
            },
          );
          handle(true);
        } else {
          Alert.alert(
            '위치정보 권한 거절',
            '앱을 사용하기 위해서는 반드시 위치정보 권한을 허용해야 합니다.확인을 누르신 뒤 설정에서 위치정보 권한을 켜십시오.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => {
                  openSettings();
                },
              },
            ],
          );
        }
      } else {
        const permission = await Geolocation.requestAuthorization('always');
        if (permission === 'granted') {
          Geolocation.getCurrentPosition(
            (position) => {
              setLat(position.coords.latitude);
              setLong(position.coords.longitude);
            },
            (e) => {
              console.log(e);
            },
            {
              enableHighAccuracy: true,
              maximumAge: 0,
              distanceFilter: 100,
            },
          );
          handle(true);
        } else {
          Alert.alert(
            '위치정보 권한 거절',
            '앱을 사용하기 위해서는 반드시 위치정보 권한을 허용해야 합니다.확인을 누르신 뒤 설정에서 위치정보 권한을 켜십시오.',
            [
              {
                text: '취소',
                style: 'cancel',
              },
              {
                text: '확인',
                onPress: () => {
                  Linking.openURL('app-settings:');
                },
              },
            ],
          );
        }
      }
    } catch (err) {
      console.warn(err);
    }
  },
  appVersion: '2.2.0',
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
