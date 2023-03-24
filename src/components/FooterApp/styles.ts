import styled from "styled-components";
import * as GC from '../../store/styles'


export const Container = styled.div`
  width: 100%;
  height: 35px;
  background-color: #ffbe69c9;
`

export const Label = styled.label`
  margin: 0 10px;
`

export const Info = styled.p`
  color: #575757;
  font-size: 0.8rem;
`

export const Anchor = styled(GC.Anchor)`
  text-decoration: underline;
  color: blueviolet;
  font-weight: bold;
`