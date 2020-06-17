import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const styles = theme => css`
  .hero {
    margin-top: 5px;
    height: 30vh;
  }

  .call {
    height:40vh
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
