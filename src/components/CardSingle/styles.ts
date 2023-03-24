import styled, { keyframes } from 'styled-components';

const lateCardAlertAnimation = keyframes`
  100%{
      background: radial-gradient(rgb(255, 190, 190), rgb(255, 113, 113));
    }
`;

export const SingleCard = styled.div<{ cardWidth: number; status: number }>`
  background: ${(props) =>
    props.status === 1
      ? 'radial-gradient(#ffbd61ce, #FF9F1C);'
      : props.status === 2
      ? 'radial-gradient(#7bff61ce, #82ff1c)'
      : props.status === 0
      ? 'radial-gradient(#aaaaaace, #797979);'
      : props.status === 3
      ? 'radial-gradient(#1c77ffa8, #1C77FF);'
      : props.status === 4
      ? 'radial-gradient(#7e61ffa8, #da61ff);'
      : props.status === 5 && 'radial-gradient(rgb(255, 113, 113), rgb(255, 190, 190))'};
  flex: 0 0 ${(props) => props.cardWidth}px;
  scale: 0.93;
  padding: 8px;
  transition: all ease 0.3s;
  border-radius: 10px;
  border: 1px solid #b6b6b6;
  box-shadow: 0 0 10px #6e6e6e;
  animation: 1s linear infinite ${(props) => props.status === 5 && lateCardAlertAnimation};
  cursor: pointer;

  &:hover {
    scale: 1;
    border-radius: 20px;
  }
`;

export const SingleCardTitle = styled.h4`
  font-size: 36px;
  color: white;
  text-align: center;
`;

export const Subhead = styled.p`
  font-weight: bold;
  font-size: 15px;
  margin-top: 4px;
`;

export const SubheadCodDescription = styled.span<{ weight: string }>`
  font-size: 15px;
  font-weight: ${(props) => props.weight && props.weight};
`;

export const SubheadInfo = styled.p`
  font-size: 14px;
  font-weight: lighter;
  width: 100%;
`;
