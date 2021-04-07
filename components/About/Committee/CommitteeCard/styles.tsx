import { css } from '@emotion/react'

export const styles = theme => css`
  .card-overlay {
    opacity: 0;
    transition: 0.3s;

    &:hover {
      opacity: 0.8;
    }
  }

  .icon {
    font-size: 27px;
  }
`
