import { css } from '@emotion/react'

export const styles = (theme, size, dark, image) => css`
  background-color: ${theme.colors[dark ? 'primary' : 'secondary']};
  color: ${theme.colors[!dark ? 'primary' : 'secondary']};
  border: 1px solid ${theme.colors[!dark ? 'primary' : 'secondary']};

  padding: 0.25rem;
  height: ${size}px;
  width: ${size}px;
  font-size: ${size / 2}px;

  ${!!image &&
  `
    background-image: url('${image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `}
`
