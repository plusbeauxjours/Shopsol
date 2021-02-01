import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import {setAlertVisible} from '../redux/alertSlice';
import styleGuide from '~/constants/styleGuide';
import FastImage from 'react-native-fast-image';
import Loader from '~/components/Loader';
import ImageViewer from 'react-native-image-zoom-viewer';
import utils from '~/constants/utils';

interface IColor {
  color: string;
}
interface IWarning {
  warning: string;
}

interface IIsHeight {
  isHeight: boolean;
}

const BackGround = styled.View`
  flex: 1;
  background-color: #ffffff;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const WhiteBox = styled.View<IIsHeight>`
  height: ${(props) => (props.isHeight ? 440 : 280)}px;
  background-color: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
`;

const Box = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: ${styleGuide.palette.primary};
  margin-bottom: 30px;
`;

const Content = styled.Text`
  font-size: 14px;
  color: ${styleGuide.palette.greyColor};
`;

const WithHelpBtn = styled(Ripple)<IColor>`
  height: 60px;
  width: ${(props) =>
    props.color === styleGuide.palette.primary ? wp('20%') : wp('80%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
`;

const HalfBtnLeft = styled(Ripple)<IWarning>`
  height: 60px;
  width: ${wp('50%')}px;
  align-items: center;
  justify-content: center;
  border-color: #bbb;
`;

const HalfTextLeft = styled.Text`
  font-size: 18px;
  color: ${styleGuide.palette.primary};
`;

const HalfBtnRight = styled(HalfBtnLeft)<IWarning>`
  background-color: ${(props) =>
    props.warning == 'yes'
      ? styleGuide.palette.redColor
      : styleGuide.palette.primary};
`;

const HalfTextRight = styled.Text`
  font-size: 18px;
  color: white;
`;

const BarBtn = styled(Ripple)`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: ${styleGuide.palette.primary};
`;
const WhiteText = styled.Text`
  font-size: ${styleGuide.fontSize.large}px;
  color: white;
`;

const Row = styled.View`
  flex-direction: row;
`;

export default ({alert}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const TextBox = ({alert}) => (
    <Box>
      {alert.title?.length > 0 && <Title>{alert?.title}</Title>}
      <Content>{alert?.content}</Content>
    </Box>
  );

  const onPressExplain = () => {
    dispatch(setAlertVisible(false));
    navigation.navigate('HelpModalScreen');
  };

  const onOKPress = () => {
    dispatch(setAlertVisible(false));
    alert?.okCallback && alert.okCallback();
  };

  const onCancelPress = () => {
    dispatch(setAlertVisible(false));
    alert?.cancelCallback && alert.cancelCallback();
  };

  return (
    <Modal
      onRequestClose={() => dispatch(setAlertVisible(false))}
      onBackdropPress={() => dispatch(setAlertVisible(false))}
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        justifyContent: 'flex-end',
      }}
      isVisible={alert.visible}>
      {alert.image && (
        <ImageViewer
          imageUrls={[{url: getUriImage(alert.image)}]}
          onSwipeDown={() => dispatch(setAlertVisible(false))}
          backgroundColor={'transparent'}
          saveToLocalByLongPress={false}
          enableSwipeDown
          useNativeDriver
          enablePreload
          loadingRender={() => <Loader />}
          renderIndicator={() => null}
          renderImage={(props) => (
            <FastImage
              style={{width: '100%', height: '100%'}}
              source={{
                uri: utils.getUriImage(props.source.uri),
                cache: FastImage.cacheControl.immutable,
                priority: FastImage.priority.low,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          )}
        />
      )}
      {alert.alertType == 'explain' ? (
        <WhiteBox isHeight={alert.isHeight}>
          <BackGround>
            <TextBox alert={alert} />
          </BackGround>
          <Row>
            <WithHelpBtn
              color={'white'}
              onPress={() =>
                setTimeout(() => {
                  onOKPress();
                }, 200)
              }
              rippleColor={styleGuide.palette.lightGreyColor}
              rippleSize={1200}
              rippleDuration={600}
              rippleOpacity={0.45}>
              <HalfTextLeft>{alert.okButtonText}</HalfTextLeft>
            </WithHelpBtn>
            <WithHelpBtn
              color={styleGuide.palette.primary}
              onPress={() =>
                setTimeout(() => {
                  onPressExplain();
                }, 200)
              }
              rippleColor={styleGuide.palette.rippleColor}
              rippleSize={1200}
              rippleDuration={600}
              rippleOpacity={0.4}>
              <WhiteText>도움말</WhiteText>
              <WhiteText>전체보기</WhiteText>
            </WithHelpBtn>
          </Row>
        </WhiteBox>
      ) : (
        <WhiteBox>
          <BackGround>
            <TextBox alert={alert} />
          </BackGround>
          {alert.alertType === 'confirm' ? (
            <Row>
              <HalfBtnLeft
                warning={alert.warning}
                onPress={() =>
                  setTimeout(() => {
                    onCancelPress();
                  }, 200)
                }
                rippleColor={styleGuide.palette.rippleColor}
                rippleSize={1200}
                rippleDuration={600}
                rippleOpacity={0.45}>
                <HalfTextLeft>{alert.cancelButtonText}</HalfTextLeft>
              </HalfBtnLeft>
              <HalfBtnRight
                warning={alert.warning}
                onPress={() => {
                  setTimeout(() => {
                    onOKPress();
                  }, 200);
                }}
                rippleColor={styleGuide.palette.secondary}
                rippleSize={1200}
                rippleDuration={600}
                rippleOpacity={0.4}>
                <HalfTextRight>{alert.okButtonText}</HalfTextRight>
              </HalfBtnRight>
            </Row>
          ) : (
            <BarBtn
              onPress={() =>
                setTimeout(() => {
                  onOKPress();
                }, 200)
              }
              rippleColor={styleGuide.palette.rippleColor}
              rippleSize={1200}
              rippleDuration={600}
              rippleOpacity={0.45}>
              <WhiteText>{alert.okButtonText}</WhiteText>
            </BarBtn>
          )}
        </WhiteBox>
      )}
    </Modal>
  );
};
