import { css } from '@emotion/core'

export const style = (theme, size, dark, image) => css`
  background-color: ${theme.colors[dark ? 'primary' : 'secondary']};
  color: ${theme.colors[!dark ? 'primary' : 'secondary']};
  border: 1px solid ${theme.colors[!dark ? 'primary' : 'secondary']};

  padding: 0.25rem;
  height: 38px;
  width: 38px;

  ${!!image &&
  `
    background-image: url('${image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `}
`
