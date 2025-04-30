import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const FeaturesSection = styled.section`
 

`;
const FeaturesGlassPanel = styled.div`background: rgba(255, 255, 255, 0.15);backdrop-filter: blur(10px);border-radius: ${({ theme }) => theme.borderRadius.md};border: 1px solid rgba(255, 255, 255, 0.18);padding: ${({ theme }) => theme.spacing.xl};max-width: 1200px;margin: 0 auto ${({ theme }) => theme.spacing.xl};box-shadow: ${({ theme }) => theme.boxShadow.lg};`;
const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.md};
`;

const FeatureCard = styled.div`
  background: rgba(255, 255, 255, 0.7);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.boxShadow.md};
  transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: ${({ theme }) => theme.boxShadow.lg};
  }
`;



const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.accent};
  text-align: center;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.secondary};
  text-align: center;
`;

const FeatureDescription = styled.p`
  color: ${({ theme }) => theme.colors.darkGray};
  line-height: 1.6;
`;



const Features: React.FC = () => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const [animatedCards, setAnimatedCards] = useState<number[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 2;
      cardsRef.current.forEach((card, index) => {
          if (animatedCards.includes(index)) {
            if (!card) return;         
            card.style.transform = `translateX(0px)`;
            
            card.style.opacity = '1';
            return; // Skip animation logic for already animated cards
          }
        if (!card) return; // Basic null check

        // Animation logic for cards that are not yet animated
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + window.scrollY + card.offsetHeight / 2;
        const distance = Math.abs(scrollY - cardCenter);
        const maxDistance = window.innerHeight * 0.7;
        const percentage = 1 - distance / maxDistance;
        let translate = 0;
        let opacity = 0;
        card.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';

        // console.log commented out for cleaner console
        // console.log(`Card ${index}: Distance = ${distance.toFixed(2)}, Percentage = ${percentage.toFixed(2)}, Translate = ${translate}, Opacity = ${opacity.toFixed(2)}, Animated Cards = [${animatedCards.join(', ')}]`);

        if (distance < maxDistance){
           // Calculate initial translate and opacity based on scroll
            let initialTranslate = 0;
            let initialOpacity = percentage;

            if(index === 0) {
              initialTranslate = -100 + (100 * percentage);
            } else if (index === 2){
              initialTranslate = 100 - (100*percentage);
            }

            // Define final state
            const finalTranslate = 0;
            const finalOpacity = 1;

            // Determine easing factor (e.g., using a simple linear interpolation from 0.90 to 1)
            const easingStart = 0.90; // Start easing a bit earlier
            const easingEnd = 1;
            let easingFactor = 0;
            if (percentage > easingStart) {
                easingFactor = (percentage - easingStart) / (easingEnd - easingStart);
            }

            // Blend initial and final states using easing factor
            translate = initialTranslate * (1 - easingFactor) + finalTranslate * easingFactor;
            opacity = initialOpacity * (1 - easingFactor) + finalOpacity * easingFactor;

             if (percentage > 0.95 && !animatedCards.includes(index)) { // Check if not already animated before adding
                     setAnimatedCards(prevAnimatedCards => [...prevAnimatedCards, index]);
                 }

         }else{
            // Cards outside the animation range start at their initial hidden position
            if(index === 0) {
              translate = -100;
           } else if (index === 2){
               translate = 100;
           }
           opacity = 0;
        }
             card.style.transform = `translateX(${translate}px)`;
             card.style.opacity = opacity.toString();
      });
      }
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animatedCards]);

  return (
    <FeaturesSection>
      <SectionTitle>Discover a New World</SectionTitle>
      <FeaturesGlassPanel>
         <FeaturesGrid>
          <FeatureCard ref={(el) => { cardsRef.current[0] = el; }}>
            <FeatureIcon>🤖</FeatureIcon>
            <FeatureTitle>AI Agents</FeatureTitle>
            <FeatureDescription>
              Connect to a variety of MCP servers and access cutting-edge AI tools and data sources through our advanced AI agents.
            </FeatureDescription>
          </FeatureCard>       
        <FeatureCard ref={(el) => { cardsRef.current[1] = el; }}>
          <FeatureIcon>💰</FeatureIcon>
          <FeatureTitle>Crypto Payments</FeatureTitle>
          <FeatureDescription>
            Hold and spend our tokens to unlock the full capabilities of our AI agents and exclusive features.
          </FeatureDescription>
        </FeatureCard>
        
        <FeatureCard ref={(el) => { cardsRef.current[2] = el; }} >
          <FeatureIcon>🌐</FeatureIcon>
          <FeatureTitle>3D Experience</FeatureTitle>
          <FeatureDescription>
            Explore our platform through an immersive 3D interface inspired by historical cartography and modern web aesthetics.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
      </FeaturesGlassPanel>
    </FeaturesSection>
  );
};

export default Features;