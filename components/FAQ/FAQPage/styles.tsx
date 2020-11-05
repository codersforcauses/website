import { css } from '@emotion/core'

export const styles = (theme, isDark) => css`
  div.card-body > a{
    color:${theme.colors[isDark ? 'accent' : 'success']};
  }
`
