import { css } from '@emotion/core'

export const style = color => css`
  background-color: ${color};
  border-color: ${color};
  &:hover {
    background-color: ${color}cc;
    border-color: ${color}cc;
  }

  .icon {
    position: absolute;
    left: 1.5rem;
  }
`
