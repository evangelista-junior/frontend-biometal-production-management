import styled from 'styled-components';

export const Container = styled.div`
  /* background: linear-gradient(to right, rgba(255, 255, 255, 0.6), #CBF3F0, rgba(255, 255, 255, 0.6)); */
`;

export const Filters = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const FilterLabel = styled.label`
  text-align: center;
  padding: 8px;
  margin-right: 16px;
`;

export const FilterText = styled.p`
  font-size: 14px;
  color: #e76f51;
  font-weight: bold;
  text-align: left;
`;

export const FilterInput = styled.input`
  height: 25px;
  padding: 0 8px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const FilterSelect = styled.select`
  height: 25px;
  padding: 0 8px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
`;

export const FilterSelectOption = styled.option``;

export const FilterButton = styled.button`
  height: 25px;
  padding: 0 4px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #ccc;
  cursor: pointer;
  transition: all ease 0.3s;
  font-weight: lighter;

  &:hover {
    font-weight: normal;
    border: 1px solid #e76f51;
  }
`;

export const ProcessList = styled.div``;
