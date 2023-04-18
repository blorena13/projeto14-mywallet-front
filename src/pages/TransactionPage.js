import styled from "styled-components"

export default function TransactionsPage() {
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form>
        <input data-test="registry-amount-input" placeholder="Valor" type="text"/>
        <input data-test="registry-name-input" placeholder="Descrição" type="text" />
        <button data-test="registry-save" >Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>

    //se for entrada fica de um jeito se for saída fica de outro
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
