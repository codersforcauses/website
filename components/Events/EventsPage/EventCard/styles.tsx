import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = (theme, image) => css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  .event-img {
    width: 100%;
    background: url(${image}) center/cover;
  }
  .heading {
    font-size: 1.5rem;
    font-weight: bold;
    line-height: 1.7rem;
  }
  .smaller {
    line-height: 1.3;
  }

  ${media.lg`
    grid-template-columns: 1fr 1.5fr;
    grid-template-rows: 1fr;
  `}
`
