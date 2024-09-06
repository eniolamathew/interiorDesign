import styled, { keyframes } from 'styled-components';
import theme from '../style/theme';

interface HomeContainerProps {
  background: string;
}

const moveBackground = keyframes`
  0% { transform: translateX(0); }
  50% { transform: translateX(-15%); }
  100% { transform: translateX(0); }
`;

export const HomeWrapper = styled.div`
  width: 100vw;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
`;

export const HomeContainer = styled.div<HomeContainerProps>`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 120%;
    height: 100%;
    background-image: url(${props => props.background});
    background-size: cover;
    background-position: center;
    animation: ${moveBackground} 20s infinite alternate linear;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 2;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.8) 15%, rgba(0, 0, 0, 0.80) 50%, rgba(0, 0, 0, 0.95) 70%, rgba(0, 0, 0, 0.6) 95%, rgba(0, 0, 0, 1) 100%);
    opacity: 0.9;
  }
`;

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const MaxWidth = styled.div`
  max-width: ${theme.breakpoints.lg}px;
  margin: 0 auto;
  text-align: center;
`;

export const HomeContent = styled.div`
  text-align: center;
  color: white;
`;

export const EmailContainer = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
  align-items: center;
  margin-top: 12px;
  justify-content: center;
`;

export const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const CurveContainer = styled.div`
  position: relative;
  height: 5px;
  box-shadow: 1px 1px 30px 1px rgba(129, 218, 66, 0.9);
`;

export const GradientBackground = styled.div`
  height: 5px;
  background: linear-gradient(90deg, #FE3600 0%, #FF7B02 16%, #FAD220 34%, #81DA42 58%, #318EFF 81%, #8B68E8 100%);
  filter: blur(4px);
  position: absolute;
  z-index: 5;
`;

export const Text1 = styled.div`
  font-size: 3rem;
  color: white;
`;

export const Text2 = styled.div`
  font-size: 2rem;
  color: white;

  span {
    color: #007BFF;
  }
`;

export const Text3 = styled.div`
  font-size: 1.2rem;
  color: white;
`;

export const Text4 = styled.div`
  font-size: 1.2rem;
  margin-top: 2rem;
  color: white;
`;
