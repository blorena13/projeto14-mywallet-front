import styled from "styled-components";
import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InfoContext } from "../context/InfoContext";
import { useEffect } from "react";

export default function TransactionsPage() {

  const { tipo } = useParams();
  const [valor, setValor] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();
  const { token, setToken} = useContext(InfoContext);
  const tipoAcento = tipo?.replace(/saida/g, "saída");


  function transacao(e) {
    e.preventDefault();

    const urlPost = `${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`;
    const body = { valor, descricao, tipo };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const promise = axios.post(urlPost, body, config);
    promise.then(res => {

      navigate("/home");

    })
    promise.catch(err => {
      console.log(err.response.data);
    })
  }

  const descricaoValue = (e) => {
    const descricaoInput = e.target.value;
    setDescricao(descricaoInput.charAt(0).toUpperCase() + descricaoInput.slice(1));
  }


  return (
    <TransactionsContainer>
      <h1>Nova {tipoAcento}</h1>
      <form>
        <input
          data-test="registry-amount-input"
          placeholder="Valor"
          type="text"
          value={valor}
          onChange={e => setValor(e.target.value)}
        />

        <input
          data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          value={descricao}
          onChange={descricaoValue}
        />

        <button data-test="registry-save" onClick={(e) => { transacao(e) }}  >Salvar {tipo}</button>
      </form>
    </TransactionsContainer>

    
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;


  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
