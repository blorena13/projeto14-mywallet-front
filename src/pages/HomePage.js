import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useContext, useEffect } from "react";
import { InfoContext } from "../context/InfoContext";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function HomePage() {

  const { token, nome, setToken } = useContext(InfoContext);
  const [registros, setRegistros] = useState([]);
  const navigate = useNavigate();
  const [saldo, setSaldo] = useState(0);

  // const { tipo } = useParams();

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}/nova-transacao`;
    const config = {
      headers:
        { Authorization: `Bearer ${token}` }
    }

    const promise = axios.get(url, config);
    promise.then((res) => {

      const transacoesColor = res.data.map(transacao => {
        const color = transacao.tipo === "entrada" ? "positivo" : "negativo";
        return { ...transacao, color };
      })
      setRegistros(transacoesColor);

      const entradas = transacoesColor.filter(t => t.tipo === 'entrada')?.reduce((acc, t) => acc + parseFloat(t.valor), 0);
      const saidas = transacoesColor.filter(t => t.tipo === 'saida')?.reduce((acc, t) => acc + parseFloat(t.valor), 0);
      const novoSaldo = entradas - saidas;

      setSaldo(novoSaldo.toFixed(2));


    })
    promise.catch(err => console.log(err.response.data.mesagem));

  }, []);




  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {nome}</h1>
        <BiExit onClick={()=> {
          setToken("");
          navigate("/");
        }} />
      </Header>

      <TransactionsContainer>
        <ul>

          {registros.map(registro => (

            <ListItemContainer key={registro.id}>
              <div>
                <span>{registro.data}</span>
                <strong>{registro.descricao}</strong>
              </div>
              <Value color={registro.color}>{registro.valor}</Value>
            </ListItemContainer>
          ))}

        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={saldo > 0 ? "positivo" : "negativo"}>{saldo}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`

  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: auto;
  
  
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul {
    overflow-y: scroll;
    scroll-behavior: smooth;
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`