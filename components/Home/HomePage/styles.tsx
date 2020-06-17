import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const styles = theme => css`
  .hero {
    margin-top: 5px;
    height: 30vh;
  }

  .lead {
    /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
   font-size: calc(14px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
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
