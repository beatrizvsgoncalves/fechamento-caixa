export default function Game({ id, saleValue, payment, deliverName, deliverRate }) {
  let validate = true
  if (!deliverName && !deliverRate) {
    validate = false
  }

  return (
    <div className='card-sale'>
      <h2>Venda {id}</h2>
      <p>Valor: {Number(saleValue).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
      <p>Forma de Pagamento: {payment}</p>

      { validate ? 
        <div>
          <p>Entregador: {deliverName}</p>
          <p>Taxa de entrega: {Number(deliverRate).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div> : null
      }
    </div>
  )
}