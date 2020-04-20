import { css } from '@emotion/core'

export const styles = theme => css`
  .nav-link,
  .header-link {
    color: ${theme.colors.secondary} !important;
    cursor: pointer;
  }
`
