import { css } from '@emotion/core'

export const styles = theme => css`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1.5rem;

  .project-img {
    height: 20rem;
    object-fit: contain;
  }
`
