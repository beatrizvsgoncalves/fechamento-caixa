import { useState } from 'react';
import NewSaleForm from './components/NewSaleForm/NewSaleForm';
import ContainerSales from './components/ContainerSales/ContainerSales';
import useSaleList from './hooks/useSaleList';

export default function App() {
  const { sales, setSales, addSale, setId } = useSaleList()
  const [ showContainer, setShowContainer ] = useState(false)

  function clearStorage() {
    if (confirm('Quer realmente excluir as vendas cadastradas?')) {
      localStorage.clear()
      alert('Vendas excluídas!')
      setId(1)
      setSales([])  
      setShowContainer(false)
    }
  }

  return (
    <>
      <header>
        <h1>Fechamento de caixa</h1>
      </header>
      <main>
        <button onClick={clearStorage} className='resetBtn'>Resetar vendas cadastradas</button>
        {!showContainer && <NewSaleForm addSale={addSale} onSubmitForm={() => setShowContainer(true)} sales={sales} />}
        {showContainer && <ContainerSales sales={sales}/>}
      </main>
      <footer>
        <a href="https://www.flaticon.com/br/icones-gratis/verificacao-de-saida" title="verificação de saída ícones">Verificação de saída ícones criados por Freepik - Flaticon</a>
        <div><a href="https://github.com/beatrizvsgoncalves" target='_blank'>Coded by Beatriz Gonçalves</a></div>
      </footer>
    </>
  )
}