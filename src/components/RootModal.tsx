import React from 'react';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import styled from 'styled-components/native';
import {useDispatch} from 'react-redux';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import Ripple from 'react-native-material-ripple';

import {setAlertVisible} from '../redux/alertSlice';

interface IColor {
  color: string;
}
interface IWarning {
  warning: string;
}

const BackGround = styled.View`
  flex: 1;
  background-color: #ffffff;
`;

const WhiteBox = styled.View`
  height: 280px;
  background-color: white;
`;

const Box = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #e85356;
  margin-bottom: 30px;
`;

const Content = styled.Text`
  font-size: 15px;
  color: #707070;
`;

const WithHelpBtn = styled(Ripple)<IColor>`
  height: 60px;
  width: ${(props) => (props.color === '#e85356' ? wp('20%') : wp('80%'))}px;
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
  border-top-width: ${(props) => (props.warning == 'yes' ? '1px' : 0)};
`;

const HalfTextLeft = styled.Text`
  font-size: 18px;
  color: #e85356;
`;

const HalfBtnRight = styled(HalfBtnLeft)<IWarning>`
  background-color: ${(props) => (props.warning == 'yes' ? '#fff' : '#e85356')};
  border-left-width: ${(props) => (props.warning == 'yes' ? '1px' : 0)};
`;

const HalfTextRight = styled.Text<IWarning>`
  font-size: 18px;
  color: ${(props) => (props.warning == 'yes' ? '#B91C1B' : '#fff')};
`;

const BarBtn = styled(Ripple)`
  height: 60px;
  width: ${wp('100%')}px;
  align-items: center;
  justify-content: center;
  background-color: #e85356;
`;
const WhiteText = styled.Text`
  font-size: 16px;
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
      <Title>{alert?.title}</Title>
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
      style={{margin: 0, justifyContent: 'flex-end'}}
      isVisible={alert.visible}>
      {alert.alertType == 'explain' ? (
        <WhiteBox>
          <BackGround>
            <TextBox alert={alert} />
          </BackGround>
          <Row>
            <WithHelpBtn
              color={'#fff'}
              onPress={() => onOKPress()}
              rippleColor={'#666'}
              rippleSize={1200}
              rippleDuration={600}
              rippleOpacity={0.45}>
              <HalfTextLeft>{alert.okButtonText}</HalfTextLeft>
            </WithHelpBtn>
            <WithHelpBtn
              color={'#e85356'}
              onPress={() => onPressExplain()}
              rippleColor={'##e39a9c'}
              rippleSize={1200}
              rippleDuration={600}
              rippleOpacity={0.1}>
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
                onPress={() => onCancelPress()}
                rippleColor={'#e39a9c'}
                rippleSize={1200}
                rippleDuration={600}
                rippleOpacity={0.45}>
                <HalfTextLeft>{alert.cancelButtonText}</HalfTextLeft>
              </HalfBtnLeft>
              <HalfBtnRight
                warning={alert.warning}
                onPress={() => onOKPress()}
                rippleColor={'#ff3333'}
                rippleSize={1200}
                rippleDuration={600}
                rippleOpacity={0.1}>
                <HalfTextRight warning={alert.warning}>
                  {alert.okButtonText}
                </HalfTextRight>
              </HalfBtnRight>
            </Row>
          ) : (
            <BarBtn
              onPress={() => onOKPress()}
              rippleColor={'#e39a9c'}
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
