import styled from 'styled-components';
import { Filters } from '../Filters';
import { Logo } from './Logo';

export function Header() {
  return (
    <HeaderContainer>
      <Logo />
      <Filters />
    </HeaderContainer>
  );
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 950px) {
    flex-direction: column;
    gap: 30px;
  }
`;
