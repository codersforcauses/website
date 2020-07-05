import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const styles = theme => css`
  .hero {
    margin-top: 5px;
    height: 30vh;
  }
  
  .header {
    font-weight: bolder;
    margin-bottom: 1.2rem;
  }

  .lead {
    /* font-size: calc([minimum size] + ([maximum size] - [minimum size]) * ((100vw - [minimum viewport width]) / ([maximum viewport width] - [minimum viewport width]))); */
    font-size: calc(10px + (26 - 14) * ((100vw - 300px) / (1600 - 300)));
    line-height: calc(1.3em + (1.5 - 1.2) * ((100vw - 300px)/(1600 - 300)));
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
