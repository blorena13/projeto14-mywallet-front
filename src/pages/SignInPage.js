import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../context/InfoContext";
import { useContext } from "react";

export default function SignInPage() {

  const navigate = useNavigate();
  const { email, setEmail, password, setPassword} = useContext(InfoContext);

  function login(e){
    e.preventDefault();

    const urlPost = "http://localhost:5000/login";
    const body = {email: email, senha: password};

    const promise = axios.post(urlPost, body)
    promise.then( res => {

      navigate("/home");
    });
    promise.catch(err =>{
      console.log(err.response.data.mensagem);
    });

  }
  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input data-test="email" placeholder="E-mail" type="email" />
        <input data-teste="password" placeholder="Senha" type="password" autocomplete="new-password" />
        <button data-test= "sign-in-submit" >Entrar</button>
      </form>

      <Link to={`/cadastro`}>
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
