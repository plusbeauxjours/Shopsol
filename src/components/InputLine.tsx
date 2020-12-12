import React from 'react';
import styled from 'styled-components/native';

interface IIsBefore {
  isBefore: boolean;
}

const Line = styled.View<IIsBefore>`
  height: 0.7px;
  background-color: ${(props) => (props.isBefore ? '#CCCCCC' : '#e85356')};
`;

export default ({isBefore}) => <Line isBefore={isBefore} />;
