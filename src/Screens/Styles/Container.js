import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 10px;
  width: 1000px;
  ${props =>
    props.bgFilled &&
    `
      background: black;
      padding: 16px;
      cursor: pointer;
    `}
`;

export default Container;
