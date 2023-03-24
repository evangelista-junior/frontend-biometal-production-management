import styled from 'styled-components';

export const Container = styled.div``;

export const CardRowContainer = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 0 5px #ccc;
`;

export const CardRowTitle = styled.h1`
  color: #264653;
  font-weight: bold;
`;

export const CardRowTitleInfo = styled.p`
  font-size: 16px;
  color: #264653;
  font-weight: lighter;
`;

const NavigateBase = styled.div`
  cursor: pointer;
  position: absolute;
  width: 80px;
  height: inherit;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  opacity: 0;
  transition: all ease 0.5s;

  &:hover {
    width: 60px;
  }
`;

export const CardList = styled.div`
  display: flex;
  align-items: center;
  transition: all ease 0.3s;
  overflow-x: scroll;
  height: 330px;
  padding-left: 16px;

  &:hover ${NavigateBase} {
    opacity: 1;
  }
`;

export const NavigateBefore = styled(NavigateBase)`
  left: 0;
  background: linear-gradient(to left, transparent, #0000004b);
`;

export const NavigateNext = styled(NavigateBase)`
  right: 0;
  background: linear-gradient(to right, transparent, #0000004b);
`;
