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

  .email {
    font-size: 1rem;
  }

  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
