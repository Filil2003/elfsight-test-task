import styled from 'styled-components';

export function Button({ children, color, ...restProps }) {
  return (
    <StyledButton color={color} {...restProps}>
      {children}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 40px;
  line-height: 0;

  ${({ color }) => {
    const btnColor = color || 'var(--color-accent)';

    return `
      color: ${btnColor};
      border: 1px solid ${btnColor};
      
      @media (any-hover: hover) {
        &:hover {
          color: white;
          background-color: ${btnColor};
        }
      }
    `;
  }}
`;
