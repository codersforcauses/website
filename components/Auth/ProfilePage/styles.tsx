import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .avatar {
    margin-top: -73px;
  }
  .text-area {
    min-height: 10rem;
  }
  .counter {
    float: right;
    position: absolute;
    bottom: 0;
    right: 1rem;
  }

  ${media.sm`
  `}
`
