import React from 'react';
import styled from 'styled-components/native';

interface IsBefore {
  isBefore: boolean;
}

const Row = styled.View`
  flex-direction: row;
`;

const TextInputContainer = styled.View<IsBefore>`
  width: 50%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isBefore ? '#e85356' : '#F2F2F2')};
  align-items: center;
  justify-content: center;
`;

const TextInput = styled.TextInput`
  font-size: 15px;
  font-weight: bold;
  color: #e85356;
`;

const Box = styled.TouchableOpacity<IsBefore>`
  width: 25%;
  height: 40px;
  border-width: 1px;
  border-color: ${(props) => (props.isBefore ? '#e85356' : '#F2F2F2')};
  align-items: center;
  justify-content: center;
`;

const BoxText = styled.Text<IsBefore>`
  font-size: 15px;
  font-weight: bold;
  color: ${(props) => (props.isBefore ? '#e85356' : '#CCCCCC')};
`;

export const RenderProbation2 = ({
  rowData,
  rowNum,
  percentCheck,
  setPercentCheck,
  percentDirectInput,
  setPercentDirectInput,
}) => {
  return (
    <Row>
      <RenderProbationData2
        rowData={rowData}
        rowNum={rowNum}
        percentCheck={percentCheck}
        setPercentCheck={setPercentCheck}
        percentDirectInput={percentDirectInput}
        setPercentDirectInput={setPercentDirectInput}
      />
    </Row>
  );
};

export const RenderProbationData2 = ({
  rowData,
  rowNum,
  percentCheck,
  setPercentCheck,
  percentDirectInput,
  setPercentDirectInput,
}) => {
  let value = JSON.parse(JSON.stringify(percentCheck));
  return rowData.map((data, index) => {
    index = index + 4 * (rowNum - 1);
    if (data === 'directInput') {
      return (
        <TextInputContainer isBefore={value[index]} key={index}>
          <TextInput
            onChangeText={(text) => setPercentDirectInput(text)}
            value={percentDirectInput}
            selectionColor={'#999'}
            placeholder={'직접 입력'}
            placeholderTextColor={'#CCCCCC'}
            keyboardType={'number-pad'}
            maxLength={2}
            onFocus={() => {
              value.fill(false); // ES6
              value[index] = true;
              setPercentCheck(value);
            }}
          />
        </TextInputContainer>
      );
    }
    return (
      <Box
        isBefore={value[index]}
        onPress={() => {
          value.fill(false); // ES6
          value[index] = true;
          setPercentCheck(value);
          setPercentDirectInput('');
        }}
        key={index}>
        <BoxText isBefore={value[index]}>{data}</BoxText>
      </Box>
    );
  });
};

export const RenderPayYear = ({
  rowData,
  rowNum,
  payYearCheck,
  setPayYearCheck,
  payYearDirectInput,
  setPayYearDirectInput,
}) => {
  return (
    <Row>
      <RenderPayYearData
        rowData={rowData}
        rowNum={rowNum}
        payYearCheck={payYearCheck}
        setPayYearCheck={setPayYearCheck}
        payYearDirectInput={payYearDirectInput}
        setPayYearDirectInput={setPayYearDirectInput}
      />
    </Row>
  );
};

export const RenderPayYearData = ({
  rowData,
  rowNum,
  payYearCheck,
  setPayYearCheck,
  payYearDirectInput,
  setPayYearDirectInput,
}) => {
  let value = JSON.parse(JSON.stringify(payYearCheck));
  return rowData.map((data, index) => {
    index = index + 4 * (rowNum - 1);
    if (data === 'directInput') {
      return (
        <TextInputContainer isBefore={value[index]} key={index}>
          <TextInput
            onChangeText={(text) => setPayYearDirectInput(text)}
            value={payYearDirectInput}
            selectionColor={'#999'}
            placeholder={'직접 입력'}
            placeholderTextColor={'#CCCCCC'}
            keyboardType={'number-pad'}
            maxLength={2}
            onFocus={() => {
              value.fill(false); // ES6
              value[index] = true;
              setPayYearCheck(value);
            }}
          />
        </TextInputContainer>
      );
    }
    return (
      <Box
        isBefore={value[index]}
        onPress={() => {
          value.fill(false); // ES6
          value[index] = true;
          setPayYearCheck(value);
        }}
        key={index}>
        <BoxText isBefore={value[index]}>{data}</BoxText>
      </Box>
    );
  });
};

export const RenderPayMonth = ({
  rowData,
  rowNum,
  payMonthCheck,
  setPayMonthCheck,
}) => {
  return (
    <Row>
      <RenderPayMonthData
        rowData={rowData}
        rowNum={rowNum}
        payMonthCheck={payMonthCheck}
        setPayMonthCheck={setPayMonthCheck}
      />
    </Row>
  );
};

export const RenderPayMonthData = ({
  rowData,
  rowNum,
  payMonthCheck,
  setPayMonthCheck,
}) => {
  let value = JSON.parse(JSON.stringify(payMonthCheck));
  return rowData.map((data, index) => {
    index = index + 4 * (rowNum - 1);
    return (
      <Box
        isBefore={value[index]}
        onPress={() => {
          value.fill(false); // ES6
          value[index] = true;
          setPayMonthCheck(value);
        }}
        key={index}>
        <BoxText isBefore={value[index]}>{data}</BoxText>
      </Box>
    );
  });
};
