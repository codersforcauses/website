import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .copyright {
    font-size: 0.64rem;
    line-height: 1.2;
  }
  .legal {
    max-width: 500px;
  }

  ${media.md`
    .social {
      max-width: 200px;
    } 
  `}
`
