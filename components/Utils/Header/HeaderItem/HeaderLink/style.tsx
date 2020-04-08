import { css } from '@emotion/core'

export const style = theme => css`
  .nav-link,
  .header-link {
    color: ${theme.colors.secondary} !important;
    cursor: pointer;
  }
`
