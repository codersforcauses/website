import { css } from '@emotion/core'

export const styles = theme => css`
  .icon {
    font-size: 1.4rem;
    margin-right: 0.5rem;
    vertical-align: middle;

    &:hover {
      color: ${theme.colors.primary};
    }
  }
`
