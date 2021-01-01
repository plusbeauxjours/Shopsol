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

export default ({isBefore}) => <Line isBefore={isBefore} />;
