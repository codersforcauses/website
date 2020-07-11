import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .hero {
    height: 30vh;
    margin: 0;
  }

  .lead {
    font-size: clamp(18px, 3vmin, 22px);
    line-height: 1.6;
    margin-bottom: 24px;
  }

  .call {
    height: 40vh;
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
