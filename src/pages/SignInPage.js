import styled from "styled-components";
import { Link } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { InfoContext } from "../context/InfoContext";
import { useContext } from "react";

export default function SignInPage() {

  const navigate = useNavigate();
  const { email, setEmail, senha, setNome, setSenha, setToken, user, setUser, usuarioLogado, setUsuarioLogado } = useContext(InfoContext);

  function login(e) {
    e.preventDefault();

    const urlPost = `${process.env.REACT_APP_API_URL}/login`;
    const body = { email: email, senha: senha };

    const promise = axios.post(urlPost, body)
    promise.then(res => {
      const { token, nome, idUsuario } = res.data;
      setNome(nome);
      setToken(token);
      setUsuarioLogado(idUsuario);
      console.log("userId" + idUsuario);
      localStorage.setItem("user", JSON.stringify({token, nome}))

      navigate("/home");

    });
    promise.catch(err => {
      console.log(err.response.data.mensagem);
    });
  }

  return (
    <SingInContainer>
      <form onSubmit={login}>
        <MyWalletLogo />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          data-teste="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={senha}
          onChange={e => setSenha(e.target.value)}
        />

        <button
          data-test="sign-in-submit"
          onClick={(e) => {
            e.persist();
            login(e);
          }}
        >Entrar</button>
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
