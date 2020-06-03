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
  .legal,
  .social {
    button {
      &:first-of-type {
        padding-left: 0;
      }
      &:last-of-type {
        padding-right: 0;
      }
    }
  }

  ${media.md`
    .social {
      max-width: 200px;
    } 
  `}
`
