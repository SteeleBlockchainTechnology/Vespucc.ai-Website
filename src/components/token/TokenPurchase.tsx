import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

const PurchaseContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const InputGroup = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Label = styled.label`
  display: block;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}50`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.accent}30`};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => `${theme.colors.secondary}50`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: 1rem;
  background-color: white;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => `${theme.colors.accent}30`};
  }
`;

const SummaryContainer = styled.div`
  background-color: ${({ theme }) => `${theme.colors.background}70`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  margin: ${({ theme }) => `${theme.spacing.md} 0`};
`;

const SummaryItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:last-child {
    margin-bottom: 0;
    font-weight: 700;
  }
`;

interface PurchaseButtonProps {
  disabled: boolean;
}

const PurchaseButton = styled.button<PurchaseButtonProps>`
  background-color: ${({ theme }) => theme.colors.accent};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.md};
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.normal};
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray};
    cursor: not-allowed;
    transform: none;
  }
`;

type PaymentMethod = 'eth' | 'btc' | 'usdc' | 'card';

const TokenPurchase: React.FC = () => {
  const [amount, setAmount] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('eth');
  
  // Calculate token amount based on price
  const tokenPrice = 0.0125; // in USD
  const tokenAmount = amount ? (parseFloat(amount) / tokenPrice).toFixed(2) : '0';
  
  // Calculate fees (example)
  const fees = amount ? (parseFloat(amount) * 0.02).toFixed(2) : '0';
  const total = amount ? (parseFloat(amount) + parseFloat(fees)).toFixed(2) : '0';
  
  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };
  
  const handlePaymentMethodChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(e.target.value as PaymentMethod);
  };
  
  return (
    <PurchaseContainer>
      <SectionTitle>Purchase Tokens</SectionTitle>
      
      <InputGroup>
        <Label htmlFor="amount">Amount (USD)</Label>
        <Input 
          id="amount" 
          type="number" 
          placeholder="Enter amount in USD" 
          value={amount} 
          onChange={handleAmountChange}
          min="1"
        />
      </InputGroup>
      
      <InputGroup>
        <Label htmlFor="payment">Payment Method</Label>
        <Select 
          id="payment" 
          value={paymentMethod} 
          onChange={handlePaymentMethodChange}
        >
          <option value="eth">Ethereum (ETH)</option>
          <option value="btc">Bitcoin (BTC)</option>
          <option value="usdc">USD Coin (USDC)</option>
          <option value="card">Credit/Debit Card</option>
        </Select>
      </InputGroup>
      
      <SummaryContainer>
        <SummaryItem>
          <span>Price per Token:</span>
          <span>$-</span>
        </SummaryItem>
        <SummaryItem>
          <span>Token Amount:</span>
          <span>{tokenAmount} VESP</span>
        </SummaryItem>
        <SummaryItem>
          <span>Processing Fee:</span>
          <span>${fees}</span>
        </SummaryItem>
        <SummaryItem>
          <span>Total:</span>
          <span>${total}</span>
        </SummaryItem>
      </SummaryContainer>
      
      <PurchaseButton disabled={!amount || parseFloat(amount) <= 0}>
        Purchase Tokens
      </PurchaseButton>
    </PurchaseContainer>
  );
};

export default TokenPurchase;