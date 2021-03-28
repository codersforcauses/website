import { css } from '@emotion/react'

export const styles = (theme, image) => css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.secondary};

  padding: 0.25rem;
  height: 30px;
  width: 30px;

  ${image &&
  `
    background-image: url('${image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `}
`
