import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  border-bottom: 2px solid rgb(245, 134, 52);
  height: 75px;
  width: 100%;
  box-shadow: 0px 5px 10px #ccc;
  text-align: center;
`;

export const Label = styled.label`
  margin: 0 32px;
  font-size: 16px;
`;

export const NavBarLink = styled(Link)`
  font-size: 0.9rem;
  margin: 0 8px;
  transition: 0.2s;

  &:hover {
    color: rgb(245, 134, 52);
    font-weight: bold;
  }
`;

export const Image = styled.img`
  width: 100%;
  max-width: 120px;
`;

export const Button = styled.button`
  font-size: 13px;
  background-color: rgb(245, 134, 52);
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 4px 10px #ccc;
  color: white;
  cursor: pointer;
`;
