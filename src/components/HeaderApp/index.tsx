import logo from './../../images/logo.png';
import * as C from './styles';
import { Center } from '../../store/styles';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signout();
        navigate('/');
    };

    return (
        <C.Container>
            <Center>
                <C.Label>
                    <C.NavBarLink to="/process-map">
                        <C.Image src={logo} />
                    </C.NavBarLink>
                </C.Label>

                <C.Label>
                    <C.NavBarLink to="/process-map">mapa de processos</C.NavBarLink>
                    <C.NavBarLink to="/order-summary-by-week">
                        ordens de produção
                    </C.NavBarLink>
                    <C.NavBarLink to="/layouts">layouts</C.NavBarLink>
                    <C.NavBarLink to="/work-settings">configurações</C.NavBarLink>
                </C.Label>

                {auth.user ? (
                    <C.Label onClick={handleLogout}>
                        <C.Button>Sair</C.Button>
                    </C.Label>
                ) : (
                    ''
                )}
            </Center>
        </C.Container>
    );
}

export default Header;
