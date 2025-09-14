import { useState } from 'react';
import './index.css';
import Sale from '../Sale/Sale';
import InputCheckbox from '../InputCheckbox/InputCheckbox';
import { sumAllSales, sumByPaymentType, sumRateByDeliver } from '../../js/sums';

export default function ContainerSales({sales}) {
  const [ showAllSales, setShowAllSales ] = useState(false)
  const payment = sumByPaymentType(sales)
  const totalSales = sumAllSales(sales)
  const delivers = sumRateByDeliver(sales)
  
  return (
    <div className='container-sales'>
      { sales.length > 0 
        ? (
          <div className='total-sales'>
            <p className='total-value'>Total de vendas <span className="values">{totalSales}</span></p>
            <p>Pagamento em Pix <span className="values">{payment.pix}</span></p>
            <p>Pagamento em Cartão <span className="values">{payment.card}</span></p>
            <p>Pagamento em Dinheiro <span className="values">{payment.cash}</span></p>
            { delivers && 
              Object.entries(delivers).map(([deliver, rate]) => (
                <p key={deliver}>
                  Entregador: {deliver} 
                  <span className="values">
                    {rate.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                </p>
              ))
            }
          </div>
        )
        : <h2>Adicione uma venda primeiro!</h2>
      }

      { sales.length > 0 &&
        <InputCheckbox 
        id='showSales'
        label='Exibir todas as vendas?'
        className='checkbox-sales'
        checked={showAllSales}
        setChecked={setShowAllSales}
        />
      }
      { showAllSales 
        ? sales.map((sale) => (
          <Sale
            key={sale.id}
            id={sale.id}
            saleValue={sale.saleValue}
            payment={sale.payment}
            deliverName={sale.deliverName}
            deliverRate={sale.deliverRate}
          />
        )) : null
      }
    </div>
  )
}