import styled from 'styled-components';

export const LayoutsContainer = styled.div`
  padding: 8px;
`;

export const ButtonNewLayout = styled.button`
  background-color: green;
  border-radius: 5px;
  padding: 8px;
  border: 1px solid green;
  color: white;
  transition: 0.3s;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    background-color: white;
    color: green;
    border-radius: 10px;
    border: 1px solid green;
  }
`;

export const ListLayouts = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const LayoutSingle = styled.div`
  width: 49%;
  margin-bottom: 8px;
  margin-right: 8px;
  padding: 4px 8px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px #ccc;
`;

export const SingleHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SingleTitle = styled.h4`
  color: #f58634;
  font-size: 20px;
  margin-bottom: 4px;
`;

export const DeleteLayout = styled.button`
  border-radius: 5px;
  padding: 4px;
  background-color: red;
  color: white;
  border: 1px solid red;
  transition: 0.3s;
  margin-bottom: 8px;
  cursor: pointer;

  &:hover {
    color: red;
    background-color: white;
    border-radius: 10px;
    border: 1px solid lightcoral;
  }
`;

export const ListRoutines = styled.div``;

export const Routine = styled.p`
  text-transform: lowercase;
`;
