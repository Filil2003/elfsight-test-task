import styled from 'styled-components';

export function Input({ className, color, ...restProps }) {
  return <StyledInput className={className} $color={color} {...restProps} />;
}

const StyledInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid ${({ $color }) => $color || 'var(--color-accent)'};
  background-color: #263750;
  color: #f5f5f5;

  height: 40px;
  line-height: 0;

  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &::placeholder {
    color: #b3b3b3;
  }

  &:focus {
    background-color: #334466;
  }

  @media (any-hover: hover) {
    &:hover {
      background-color: #334466;
    }
  }
`;
