import React from 'react'
import styled from 'styled-components'

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => `${theme.colors.primary}20`};
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatLabel = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.secondary};
`;

const StatValue = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

const TokenChart = styled.div`
  height: 200px;
  background-color: ${({ theme }) => `${theme.colors.background}50`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  margin: ${({ theme }) => theme.spacing.md} 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  // Placeholder for actual chart
  &::after {
    content: '📈 Token Price Chart';
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
  }
`;

const TokenStats: React.FC = () => {
  return (
    <StatsContainer>
      <SectionTitle>Token Stats</SectionTitle>
      
      <TokenChart />
      
      <StatItem>
        <StatLabel>Current Price</StatLabel>
        <StatValue>$-</StatValue>
      </StatItem>
      
      <StatItem>
        <StatLabel>Market Cap</StatLabel>
        <StatValue>$-</StatValue>
      </StatItem>
      
      <StatItem>
        <StatLabel>Total Supply</StatLabel>
        <StatValue>-</StatValue>
      </StatItem>
      
      <StatItem>
        <StatLabel>Circulating Supply</StatLabel>
        <StatValue>-</StatValue>
      </StatItem>
      
      <StatItem>
        <StatLabel>24h Volume</StatLabel>
        <StatValue>$-</StatValue>
      </StatItem>
    </StatsContainer>
  );
};

export default TokenStats;