import React from 'react';
import * as C from './styles'
import { Center } from '../../store/styles';

let currentYear = new Date().getFullYear()
let dev = 'mailto:evan_jr@hotmail.com'

function Footer() {
  
  return (
    <C.Container>
      <Center>
        <C.Label>
          <C.Info>
            Desenvolvido por: <C.Anchor href={dev}>TI Biometal</C.Anchor>
          </C.Info>
        </C.Label>
        <C.Label>
          <C.Info>©️ Todos os direitos reservados 2022 - {currentYear}</C.Info>
        </C.Label>
      </Center>
    </C.Container>

  );
}

export default Footer;