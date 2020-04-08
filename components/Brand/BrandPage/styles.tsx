import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const styles = (theme) => css`
  .hero {
    margin-top: 64px;
    height: 500px;
  }

  .email {
    font-size: 1rem;
  }

  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
