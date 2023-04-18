import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../context/InfoContext";
import { useContext } from "react";

export default function SignUpPage() {

  const navigate = useNavigate();
  const {email, setEmail, password, setPassword, nome, setNome, confSenha, setConfSenha} = useContext(InfoContext);


  function cadastrar(e){
    e.preventDefault();

    const urlPost = "http://localhost:5000/cadastro";
    const body = {nome: nome, email: email, senha: password, confirmeSenha: confSenha };

    const promise = axios.post(urlPost, body);
    promise.then(res=>{

      navigate("/");
    });
    promise.catch(err => {
      console.log(err.response.data.mensagem);
    })
  }

  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input data-test="name" placeholder="Nome" type="text" />
        <input data-test="email" placeholder="E-mail" type="email" />
        <input data-test="password" placeholder="Senha" type="password" autocomplete="new-password" />
        <input data-test="conf-password" placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button data-test="sign-up-submit" >Cadastrar</button>
      </form>

      <Link to={`/`}>
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
