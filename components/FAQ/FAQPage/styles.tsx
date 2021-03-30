import { css } from '@emotion/react'

export const styles = (theme, isDark) => css`
  div.card-body > a {
    color: ${theme.colors[isDark ? 'accent' : 'success']};
  }
`
