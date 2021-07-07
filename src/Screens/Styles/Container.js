import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 10px;
  background-color: red;
  ${props =>
    props.bgFilled &&
    `
      background: black;
      padding: 16px;
      cursor: pointer;
    `}
`;

export default Container;
