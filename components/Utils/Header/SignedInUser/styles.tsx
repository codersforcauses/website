import { css } from '@emotion/core'

export const styles = (theme, image) => css`
  background-color: ${theme.colors.primary};
  color: ${theme.colors.secondary};
  border: 1px solid ${theme.colors.secondary};

  padding: 0.25rem;
  height: 38px;
  width: 38px;

  ${image &&
  `
    background-image: url('${image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  `}
`
