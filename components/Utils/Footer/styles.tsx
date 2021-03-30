import { css } from '@emotion/react'
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
        margin-left: 0 !important;
      }
      &:last-of-type {
        margin-right: 0 !important;
      }
    }
  }

  ${media.md`
    .social {
      max-width: 200px;
    } 
  `}
`
