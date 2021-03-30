import { css } from '@emotion/react'

export const styles = theme => css`
  .header-dropdown-menu {
    border: 0;

    a {
      color: ${theme.colors.primary} !important;
    }
  }
  a.header-dropdown-toggle {
    color: ${theme.colors.secondary};
  }
`
