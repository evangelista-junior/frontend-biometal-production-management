import styled from 'styled-components';

export const ListWeeks = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

export const CardWeekSingle = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 0 5px #ccc;
  background-color: #f5f5f5;
  scale: 0.98;
  transition: 0.3s;
  width: 95%;
  max-width: 1000px;
  cursor: pointer;

  &:hover {
    border: 1px solid lightsalmon;
    scale: 1;
  }
`;

export const WrapperHeader = styled.div`
  display: flex;
  text-align: center;
  justify-content: space-between;
`;

export const CardHead = styled.span`
  font-weight: lighter;
`;

export const HeadHighlight = styled.span`
  font-weight: bold;
  color: rgb(245, 134, 52);
`;

export const WrapperContent = styled.div`
  display: none;
`;

export const WrapperContentSingle = styled.div<{ headerContent: boolean }>`
  display: flex;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding: 4px 0;
  border-radius: 5px;
  font-size: 14px;
  font-weight: ${(props) => (props.headerContent ? 'bold' : 'lighter')};
  ${(props) => props.headerContent && 'background-color: #CCC'};
  ${(props) => props.headerContent && 'margin-top: 8px'};
`;

export const OrderText = styled.p`
  width: 100%;
  max-width: 70px;
  text-align: center;
`;

export const CodeText = styled.p`
  width: 100%;
  max-width: 140px;
`;

export const DescriptionText = styled.p`
  width: 100%;
  text-align: left;
`;

export const QuantityText = styled.p`
  width: 100%;
  max-width: 110px;
`;

export const DateText = styled.p`
  width: 100%;
  max-width: 140px;
`;
