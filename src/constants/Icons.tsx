import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import utils from './utils';

interface IProps {
  size?: number;
  color?: string;
}

FontAwesome.loadFont();
Ionicons.loadFont();
MaterialCommunityIcons.loadFont();

export const ForwardIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={
      utils.isAndroid
        ? 'md-chevron-forward-outline'
        : 'ios-chevron-forward-outline'
    }
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const BackIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={
      utils.isAndroid ? 'md-chevron-back-outline' : 'ios-chevron-back-outline'
    }
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const CartIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={utils.isAndroid ? 'md-cart-outline' : 'ios-cart-outline'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const HomeIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={utils.isAndroid ? 'md-home-outline' : 'ios-home-outline'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const CloseIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'close-sharp'} size={size ?? 14} color={color ?? '#e85356'} />
);

export const LocationIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={utils.isAndroid ? 'md-location' : 'ios-location'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const LogoutIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'log-out-outline'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const CheckBoxIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'checkbox-outline'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const CheckMarkIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={utils.isAndroid ? 'md-checkmark' : 'ios-checkmark;'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const RadioBtnOnIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'radio-button-on-outline'}
    size={size ?? 14}
    color={color ?? '#e85356'}
  />
);

export const RadioBtnOffIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'radio-button-off-outline'}
    size={size ?? 14}
    color={color ?? '#F2F2F2'}
  />
);

export const HelpCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'help-circle'}
    size={size ?? 22}
    color={color ?? '#bbb'}
    style={{marginLeft: 5}}
  />
);

export const AddCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name="add-circle-outline"
    size={size ?? 30}
    color={color ?? '#e85356'}
  />
);

export const PersonCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={
      utils.isAndroid ? 'md-person-circle-outline' : 'ios-person-circle-outline'
    }
    size={size ?? 17}
    color={color ?? '#e85356'}
  />
);

export const ReloadCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'reload-outline'}
    size={size ?? 26}
    color={color ?? 'black'}
  />
);

export const UpIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name="caret-up" size={size ?? 22} color={color ?? 'white'} />
);

export const DownIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'caret-down'} size={size ?? 22} color={color ?? 'white'} />
);

export const CloseCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'close-circle-outline'}
    size={size ?? 22}
    color={color ?? 'black'}
  />
);

export const EllipseIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'ellipse-sharp'} size={size ?? 16} color={color ?? 'black'} />
);

export const HelpIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'help'} size={size ?? 24} color={color ?? 'white'} />
);

export const SettingIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'settings-sharp'}
    size={size ?? 24}
    color={color ?? 'white'}
  />
);

export const QrCodeIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name="qrcode-scan"
    size={size ?? 36}
    color={color ?? '#e85356'}
  />
);

export const CalendarIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={utils.isAndroid ? 'md-calendar-outline' : 'ios-calendar-outline'}
    size={size ?? 20}
    color={color ?? 'white'}
  />
);

export const CameraIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'camera-outline'}
    size={size ?? 30}
    color={color ?? '#e85356'}
  />
);

export const FlashOnIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'flash'} size={size ?? 20} color={color ?? '#FFF'} />
);

export const FlashOffIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'flash-off'} size={size ?? 20} color={color ?? '#FFF'} />
);

export const PersonAddIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'person-add-outline'}
    size={size ?? 22}
    color={color ?? '#e85356'}
  />
);

export const RemoveCircleIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'remove-circle-outline'}
    size={size ?? 30}
    color={color ?? '#B91C1B'}
  />
);

export const SearchIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'search-outline'}
    size={size ?? 28}
    color={color ?? '#e85356'}
  />
);
export const CreateIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'create-outline'}
    size={size ?? 28}
    color={color ?? '#e85356'}
  />
);

export const AddIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'add-outline'} size={size ?? 40} color={color ?? '#fff'} />
);

export const NewBoxIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'new-box'}
    size={size ?? 24}
    color={color ?? 'red'}
  />
);

export const PinIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'pin'}
    size={size ?? 24}
    color={color ?? 'yellow'}
  />
);

export const DeleteIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'delete-empty'}
    size={size ?? 20}
    color={color ?? '#B91C1B'}
  />
);

export const TimerIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'timer-outline'}
    size={size ?? 22}
    color={color ?? 'black'}
  />
);

export const PictureIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons
    name={'image-outline'}
    size={size ?? 40}
    color={color ?? '#e85356'}
  />
);

export const PhoneIcon: React.FC<IProps> = ({size, color}) => (
  <FontAwesome name={'phone'} size={size ?? 10} color={color ?? 'black'} />
);

export const CalendarTimesIcon: React.FC<IProps> = ({size, color}) => (
  <FontAwesome
    name={'calendar-times-o'}
    size={size ?? 20}
    color={color ?? 'black'}
  />
);

export const TenForwardIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'fast-forward-10'}
    size={size ?? 36}
    color={color ?? 'white'}
  />
);

export const TenRewindIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'rewind-10'}
    size={size ?? 36}
    color={color ?? 'white'}
  />
);

export const LandscapeIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'phone-rotate-landscape'}
    size={size ?? 28}
    color={color ?? 'white'}
  />
);

export const PortraitIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'phone-rotate-portrait'}
    size={size ?? 30}
    color={color ?? 'white'}
  />
);

export const PauseIcon: React.FC<IProps> = ({size, color}) => (
  <MaterialCommunityIcons
    name={'pause'}
    size={size ?? 42}
    color={color ?? 'white'}
  />
);
export const PlayIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'play-sharp'} size={size ?? 42} color={color ?? 'white'} />
);
export const FlashIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'flash'} size={size ?? 25} color={color ?? 'white'} />
);
export const NoFlashIcon: React.FC<IProps> = ({size, color}) => (
  <Ionicons name={'flash-off'} size={size ?? 25} color={color ?? 'white'} />
);
