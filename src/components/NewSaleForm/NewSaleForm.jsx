import { useState } from 'react';
import './index.css';
import InputTextNumber from '../InputTextNumber/InputTextNumber';
import InputCheckbox from '../InputCheckbox/InputCheckbox';

export default function NewSaleForm({ addSale, onSubmitForm, sales }) {
	const [saleValue, setSaleValue] = useState('');
	const [payment, setPayment] = useState('');
	const [deliverName, setDeliverName] = useState('');
	const [deliverRate, setDeliverRate] = useState('');
	const [selectedDeliver, setSelectedDeliver] = useState('')
	const [showDeliver, setShowDeliver] = useState(false);
	const [delivers, setDelivers] = useState([]);

	const handleAddDeliver = () => {
		if (deliverName && !delivers.includes(deliverName)) {
			setDelivers([...delivers, deliverName]);
			setDeliverName('');
			setShowDeliver(false)
		}
	};
	
	const handleNewSale = () => {
		if (saleValue === '' || payment === '') {
			alert('Preencha pelo menos o valor e a forma de pagamento!');
			return;
		} else if (selectedDeliver && deliverRate === '') {
			alert('Há um entregador selecionado. Por favor, insira a taxa de entrega!')
			return
		}
    
    let msg = `Adicionar venda?\n - Venda total: ${saleValue}\n - Forma de pagamento: ${payment}\n` 
		
		if (selectedDeliver !== '' && deliverRate !== '') {
      msg += ` - Entregador: ${selectedDeliver}\n - Taxa de entrega: ${deliverRate}`
    }

		if (confirm(msg)) {
			addSale({ saleValue, payment, deliverName: selectedDeliver, deliverRate });
			setSaleValue('');
			setPayment('');
			setDeliverRate('');
			setShowDeliver(false);
		} else {
			alert('Cancelado!');
		}
	};

	const handleSubmit = (ev) => {
		ev.preventDefault();
		
		if (sales.length < 1) {
			alert('Adicione uma venda primeiro!')
		} else if (confirm('Quer realmente fechar o caixa do dia?')) {
			if (onSubmitForm) onSubmitForm();
		}	
	};

	return (
		<form className='form' onSubmit={handleSubmit}>
			<InputTextNumber
				id='saleValue'
				label='Valor da venda:'
				type='number'
				value={saleValue}
				setValue={setSaleValue}
			/>

			<div className='form-field'>
				<label htmlFor='payment'>Tipo de pagamento:</label>
				<select
					name='payment'
					id='payment'
					value={payment}
					onChange={(e) => setPayment(e.target.value)}
				>
					<option value='' disabled>
						Selecione uma opção
					</option>
					<option value='Pix'>Pix</option>
					<option value='Cartão'>Cartão</option>
					<option value='Dinheiro'>Dinheiro</option>
				</select>
			</div>

			{delivers.length > 0 ?
				<div className='delivery'>
					<p>Entregador:</p>
					<div className='container-delivers'>
						<div>
							<input type="radio" name="delivers" id="noneDeliver" value='Nenhum' />
							<label htmlFor='noneDeliver'>Nenhum</label>
						</div>
						{
							delivers.map((deliver) => (
								<div key={deliver}>
									<input
										type="radio"
										id={deliver}
										name='delivers'
										value={deliver}
										onChange={() => setSelectedDeliver(deliver)}
										/>
									<label htmlFor={deliver}>{deliver}</label>
								</div>
							))
						}
					</div>
					{ selectedDeliver !== '' &&
						<InputTextNumber
						id='deliverRate'
						label='Valor da taxa:'
						type='number'
						value={deliverRate}
						setValue={setDeliverRate}
						/>
					}
				</div>
				: null
			}

			<InputCheckbox
				id='addDeliver'
				label='Adicionar Entregador?'
				className='checkboxDeliver'
				checked={showDeliver}
				setChecked={setShowDeliver}
			/>
			{showDeliver ? (
				<div className='addNewDeliver'>
					<input
						type="text"
						value={deliverName}
						onChange={e => setDeliverName(e.target.value)}
					/>
					<button type="button" onClick={handleAddDeliver}>Adicionar entregador</button>
				</div>
			) : null}

			<button type='button' onClick={handleNewSale}>Adicionar Venda</button>

			<button type='submit'>Fechar Caixa</button>
		</form>
	);
}
