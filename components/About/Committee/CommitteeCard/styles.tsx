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
    font-size: 1.4rem;
    margin-right: 0.5rem;
    vertical-align: middle;
    transition: 0.3s;

    &:hover {
      color: ${theme.colors.secondary};
    }
  }
`
