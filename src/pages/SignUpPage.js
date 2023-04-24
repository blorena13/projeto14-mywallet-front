import { Link } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../context/InfoContext";
import { useContext } from "react";

export default function SignUpPage() {

  const navigate = useNavigate();
  const { email, setEmail, senha, setSenha, nome, setNome, confSenha, setConfSenha } = useContext(InfoContext);


  function cadastrar(e) {
    e.preventDefault();

    if (senha!== confSenha){
      alert("As senhas não são iguais!");
      console.log("As senhas não são iguais!");
      return;
    }

    const urlPost = "http://localhost:5000/cadastro";
    const body = { nome: nome, email: email, senha: senha };

    const promise = axios.post(urlPost, body);
    promise.then(res => {
      navigate("/");
    });
    promise.catch(err => {
      console.log(err.response.data.mensagem);
    })
  }

  return (
    <SingUpContainer>
      <form onSubmit={cadastrar}>
        <MyWalletLogo />
        <input
          data-test="name"
          value={nome}
          placeholder="Nome"
          onChange={e => setNome(e.target.value)}
          type="text"
        />

        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
          value={confSenha}
          onChange={e => setConfSenha(e.target.value)}
        />

        <button
          data-test="sign-up-submit"
          onClick={(e) => {
            e.persist();
            cadastrar(e);
          }}
        >Cadastrar</button>
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
