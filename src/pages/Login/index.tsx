import {useContext, useState} from 'react'
import * as C from './styles'
import logotype from '../../images/logo.png'
import { AuthContext } from '../../contexts/Auth/AuthContext'

export const Login = () => {
  const [user, setUser] = useState<string | undefined>(undefined)
  const [senha, setSenha] = useState<string>('')
  const auth = useContext(AuthContext)

  const handleLogin = () => {
    let errors: string[] = []

    if(!user){
      errors.push('Por favor preencha o usuário !')
    }
    if(!senha){
      errors.push('Por favor preencha a senha !')
    }

    if(user && senha){
      auth.signin(user, senha).then( res =>{
        if(!res){
          errors.push('Usuário ou senha incorreto !')
        }
        if(errors.length > 0){alert(errors.join('\n'));}
      })
    }
  }

  return (
    <C.Container>
      <C.LoginContainer>
        <C.Logo src={logotype} />
        <C.Wrapper>
          <C.WrapperText>Usuário</C.WrapperText>
          <C.Input 
            placeholder='usuário Hino...'
            value={user}
            onChange={e => setUser(e.currentTarget.value.toUpperCase())}
          />
        </C.Wrapper>

        <C.Wrapper>
          <C.WrapperText>Senha</C.WrapperText>
          <C.Input 
            placeholder='senha Hino mobile...'
            type='password'
            inputMode='numeric'
            onChange={e => setSenha(e.target.value.replace(/\D+/g, ''))}
            value={senha}
          />
        </C.Wrapper>

        <C.Button onClick={handleLogin}>Entrar</C.Button>
      </C.LoginContainer>
    </C.Container>
  )
}