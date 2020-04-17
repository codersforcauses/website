import { css } from '@emotion/core'

export const style = theme => css`
  .client-logo {
    object-fit: contain;
    object-position: center;
    max-width: 100px;
    filter: grayscale(100%) contrast(0.2) brightness(1.1);
  }
`
