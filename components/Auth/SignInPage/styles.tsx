import { css } from '@emotion/core'

export const styles = theme => css`
  .signin-tab {
    background: transparent;
    &:hover {
      border: 1px solid ${theme.colors.primary}66;
    }
  }
`
