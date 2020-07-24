import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .hero {
    height: 50vh;
    margin: 0;
  }

  .email {
    font-size: 1rem;
    margin: 0;
  }

  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
