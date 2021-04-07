import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = length => css`
  display: grid;
  grid-template-columns: ${length === 3 ? '1fr 1fr 1fr' : '1fr 1fr'};
  gap: 3rem;
  place-items: center;

  div {
    min-height: 70%;
    max-height: 80px;
    min-width: 100%;
    max-width: 200px;
  }

  ${length > 3 &&
  media.md`
    grid-template-columns: repeat(${length}, 1fr);
    grid-template-rows: 1fr;
  `}
`
