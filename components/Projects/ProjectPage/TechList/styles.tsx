import { css } from '@emotion/react'

export const styles = theme => css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  > div {
    font-size: 1.2rem;
  }
  .bigger {
    font-size: 2rem;
  }
`
