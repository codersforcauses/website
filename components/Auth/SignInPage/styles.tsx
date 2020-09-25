import { css } from '@emotion/core'

export const styles = (theme, isDark) => css`
  .signin-tab {
    &:hover {
      cursor: pointer;
      border: 1px solid ${theme.colors[isDark ? 'secondary' : 'primary']}66;
    }
  }
`
