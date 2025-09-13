export const sumAllSales = (sales) =>
	sales
		.reduce((acc, sale) => acc + Number(sale.saleValue), 0)
		.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export function sumByPaymentType(sales) {
  const result = sales.reduce(
		(acc, sale) => {
			if (sale.payment === 'Pix') acc.pix += Number(sale.saleValue);
			else if (sale.payment === 'Cartão') acc.card += Number(sale.saleValue);
			else if (sale.payment === 'Dinheiro') acc.cash += Number(sale.saleValue);
			return acc;
		},
		{ pix: 0, card: 0, cash: 0 }
	);
  return {
    pix: result.pix.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    card: result.card.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
    cash: result.cash.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }
}

export function sumRateByDeliver(sales) {
  return sales.reduce((acc, sale) => {
    if (sale.deliverName) {
      if (!acc[sale.deliverName]) acc[sale.deliverName] = 0;
      acc[sale.deliverName] += Number(sale.deliverRate) || 0;
    }
    return acc
  }, {})
}

/* 
export const paymentPix = (sales) => {
	sales
		.filter((sale) => sale.payment === 'Pix')
		.reduce((acc, sale) => acc + sale.saleValue, 0);
}

export const paymentCard = (sales) => {
	sales
		.filter((sale) => sale.payment === 'Cartão')
		.reduce((acc, sale) => acc + sale.saleValue, 0);
}

export const paymentCash = (sales) => {
	sales
		.filter((sale) => sale.payment === 'Dinheiro')
		.reduce((acc, sale) => acc + sale.saleValue, 0);
} */
