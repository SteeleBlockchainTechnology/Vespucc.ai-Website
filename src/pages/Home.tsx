import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import Hero from '../components/home/Hero'
import Features from '../components/home/Features'
import Agents from './Agents'
import TokenInfo from './TokenInfo'
import Explore from './Explore'

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  min-height: 100vh;
  background-image: url('./VespucciMap1.jpg');
  background-size: cover;
  background-position: top center;
  background-attachment: fixed;
`;

const ContentOverlay = styled.div`
  min-height: 100vh;
  background: linear-gradient(rgba(245, 230, 211, 0.3), ${({ theme }) => theme.colors.background});
  padding-top: 80px;
`;

const Section = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  animation: ${fadeIn} 0.8s ease-out forwards;
  opacity: 0;
  
  &:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  &:nth-child(3) {
    animation-delay: 0.4s;
  }
`;

const CallToAction = styled.div`
  text-align: center;
  margin: 4rem 0;
  padding: 4rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const CTATitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 700;
  letter-spacing: -0.5px;
`;

const CTAText = styled.p`
  font-size: 1.2rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.secondary};
`;

const CTAButton = styled.a`
  background-color: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.white};
  padding: 1.2rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease;
  display: inline-block;
  text-decoration: none;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-3px);
    color: ${({ theme }) => theme.colors.white};
    box-shadow: 0 7px 20px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const PageContainer = styled.div`
  position: relative;
`;

const PageSection = styled.div`
  min-height: 100vh;
  position: relative;
`;

const PageDivider = styled.div`
  height: 100px;
  background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.background} 50%, transparent);
  position: relative;
  z-index: 10;
  margin: 2rem 0;
`;

const Home: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);
  const [visiblePages, _] = useState<string[]>(['home']);
  
  // Removed automatic page transition on scroll to keep pages separate
  // Initial state only shows the home page
  useEffect(() => {
    // No scroll event listener needed as we're not auto-loading pages
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    
    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
    
    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [visiblePages]);
  
  const addToRefs = (el: HTMLDivElement) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <PageContainer>
      <PageSection>
        <HomeContainer>
          <ContentOverlay>
            <Section ref={addToRefs}>
              <Hero />
            </Section>
            <Section ref={addToRefs}>
              <Features />
            </Section>
            <Section ref={addToRefs}>
              <CallToAction>
                <CTATitle>Ready to explore with Vespucc.ai?</CTATitle>
                <CTAText>Join our community of explorers and discover the digital frontier with AI-powered navigation tools.</CTAText>
                <CTAButton href="https://discord.gg/ttAV3CZk" target="_blank" rel="noopener noreferrer">
                  Get Started
                </CTAButton>
              </CallToAction>
            </Section>
          </ContentOverlay>
        </HomeContainer>
      </PageSection>
      
      {visiblePages.includes('agents') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <Agents />
          </PageSection>
        </>
      )}
      
      {visiblePages.includes('tokens') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <TokenInfo />
          </PageSection>
        </>
      )}
      
      {visiblePages.includes('explore') && (
        <>
          <PageDivider />
          <PageSection ref={addToRefs}>
            <Explore />
          </PageSection>
        </>
      )}
    </PageContainer>
  );
};

export default Home;