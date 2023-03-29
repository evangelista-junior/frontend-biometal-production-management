import React from 'react';
import RotinasConfig from '../components/rotinasConfig/RotinasConfig';
import LayoutConfig from '../components/layoutConfig/LayoutConfig';

// import { Container } from './styles';

const Configuracoes: React.FC = () => {
  return (
    <div className="configs--panel">
      <div className="configs">
        < LayoutConfig />
        < RotinasConfig />
      </div>
    </div>
  )
}

export default Configuracoes;