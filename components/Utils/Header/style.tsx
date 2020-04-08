import { css } from '@emotion/core'

export const styles = (theme) => css`
  min-height: 72px;

  .pointer {
    display: flex;
    align-items: center;

    &:hover {
      cursor: pointer;
    }
  }

  .icon {
    font-size: 1.4rem;
    vertical-align: middle;
    font-weight: bolder;
  }
`
