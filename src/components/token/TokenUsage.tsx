import React from 'react'
import styled from 'styled-components'

const UsageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UsageGridContainer = styled.div`
  overflow: visible;
  padding-top: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
`;

const UsageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const UsageCard = styled.div`
  background-color: ${({ theme }) => `${theme.colors.background}80`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.sm};
  transition: transform ${({ theme }) => theme.transitions.normal},
              box-shadow ${({ theme }) => theme.transitions.normal};
  margin-top: 3px; /* Add space to prevent cut-off on transform */
  margin-bottom: 3px; /* Add space to prevent cut-off on transform */
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: ${({ theme }) => theme.boxShadow.md};
  }
`;

const UsageTitle = styled.h3`
  color: ${({ theme }) => theme.colors.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  display: flex;
  align-items: center;
  
  & > span {
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const UsageDescription = styled.p`
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.darkGray};
`;

const TokenAmount = styled.div`
  display: inline-block;
  background-color: ${({ theme }) => `${theme.colors.accent}30`};
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.sm}`};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
`;

const TokenTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  th, td {
    padding: ${({ theme }) => theme.spacing.md};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => `${theme.colors.gray}50`};
  }
  
  th {
    background-color: ${({ theme }) => `${theme.colors.secondary}10`};
    color: ${({ theme }) => theme.colors.secondary};
    font-weight: 600;
  }
  
  tr:hover {
    background-color: ${({ theme }) => `${theme.colors.background}80`};
  }
`;

const TokenUsage = () => {
  // Example usage scenarios
  const usageScenarios = [
    {
      title: 'Web Browsing',
      icon: '🌐',
      description: 'Use AI agents to browse the web and gather information from multiple sources.',
      tokenCost: '? tokens per session'
    },
    {
      title: 'Data Analysis',
      icon: '📊',
      description: 'Process and analyze datasets to extract insights and visualizations.',
      tokenCost: '? tokens per dataset'
    },
    {
      title: 'Content Creation',
      icon: '✍️',
      description: 'Generate articles, blog posts, and creative content tailored to your needs.',
      tokenCost: '? tokens per piece'
    },
    {
      title: 'Code Development',
      icon: '💻',
      description: 'Get help with writing, debugging, and optimizing code in various languages.',
      tokenCost: '? tokens per task'
    }
  ];
  
  // Example token tier benefits
  const tokenTiers = [
     {
      tier: 'Basic',
      holdAmount: '-',
      benefits: 'Access to basic AI agents, - tasks per day'
    },
    {
      tier: 'Standard',
      holdAmount: '-',
      benefits: 'Access to all agents, - tasks per day, priority processing'
    },
    {
      tier: 'Premium',
      holdAmount: '-',
      benefits: 'Unlimited tasks, exclusive agents, API access, premium support'
    },
    {
      tier: 'Enterprise',
      holdAmount: '-',
      benefits: 'Custom agent development, dedicated support, white-label solutions'
    }
  ];
  
  return (
    <UsageContainer>
      <SectionTitle>How to Use Tokens</SectionTitle>
      
      <p>
        Vespucc.ai tokens (VESP) power the entire ecosystem. Hold tokens in your wallet to unlock access 
        tiers, and spend them to use advanced AI agent capabilities. The more tokens you hold, the more 
        features you unlock.
      </p>
      
      <h3>Usage Scenarios</h3>
      <UsageGridContainer>
        <UsageGrid>
          {usageScenarios.map((scenario, index) => (
            <UsageCard key={index}>
              <UsageTitle>
                <span>{scenario.icon}</span> {scenario.title}
              </UsageTitle>
              <UsageDescription>{scenario.description}</UsageDescription>
              <TokenAmount>{scenario.tokenCost}</TokenAmount>
            </UsageCard>
          ))}
        </UsageGrid>
      </UsageGridContainer>
      
      <h3>Token Holding Tiers</h3>
      <TokenTable>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Required Tokens</th>
            <th>Benefits</th>
          </tr>
        </thead>
        <tbody>
          {tokenTiers.map((tier, index) => (
            <tr key={index}>
              <td><strong>{tier.tier}</strong></td>
              <td>{tier.holdAmount} VESP</td>
              <td>{tier.benefits}</td>
            </tr>
          ))}
        </tbody>
      </TokenTable>
      
      <p style={{ marginTop: '1rem' }}>
        <strong>Note:</strong> Tokens are used as payment for agent services and are burnt after use, 
        maintaining the value of the ecosystem. Holding tokens in your wallet does not consume them 
        but grants you access to platform features.
      </p>
    </UsageContainer>
  );
};

export default TokenUsage;