import React from 'react';
import styled from 'styled-components/native';

import styleGuide from '~/constants/styleGuide';

interface IIsBefore {
  isBefore: boolean;
}

const Line = styled.View<IIsBefore>`
  height: 0.7px;
  background-color: ${(props) =>
    props.isBefore ? '#CCCCCC' : styleGuide.palette.primary};
`;

// 입력폼에서 내용이 있으면 색이 바뀌는 선
export default ({isBefore}) => <Line isBefore={isBefore} />;
