import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const LoginContainer = styled.div`
  width: 100%;
  max-width: 300px;
  text-align: center;
  padding: 20px 10px;
  background-color: #fff;
  box-shadow: 0 0 20px #aaa;
  border: 1px solid lightsalmon;
  border-radius: 10px;
`

export const Logo = styled.img`
  width: 100%;
  max-width: 200px;
  margin-bottom: 20px;
`

export const Wrapper = styled.div`
  margin-bottom: 10px;
`

export const WrapperText = styled.p`
  text-align: start;
  color: #0f0f0f;
  font-size: 0.9rem;
`

export const Input = styled.input`
  width: 100%;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 25px;
  padding-left: 5px;
  transition: 0.2s;

  &:focus{
    outline: none;
    border: 1px solid lightsalmon;
    border-radius: 10px;
    box-shadow: 0 0 5px #aaa;
    text-transform: uppercase;
  }
`

export const Button = styled.button`
  width: 100%;
  height: 25px;
  border: 1px solid white;
  border-radius: 5px;
  background-color: lightsalmon;
  color: black;
  cursor: pointer;
  transition: 0.1s;


  &:hover,
  &:focus{
    border: 1px solid #bbb;
    border-radius: 10px;
    background-color: lightsalmon;
  }
`