import { css } from '@emotion/core'

export const styles = theme => css`
  .signup-tab {
    &:hover {
      cursor: pointer;
      border: 1px solid ${theme.colors.primary}66;
    }
  }
`
