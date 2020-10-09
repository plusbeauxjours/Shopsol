import React from 'react';
import styled from 'styled-components/native';

interface IIsBefore {
  isBefore: boolean;
}

const Line = styled.View<IIsBefore>`
  height: 2px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#642A8C')};
`;

export default ({isBefore}) => <Line isBefore={isBefore} />;
