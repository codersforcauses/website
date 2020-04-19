import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const styles = theme => css`
  .map {
    height: 250px;
    width: 100vw;
    margin-bottom: calc(${theme.spacing[5] * -2}rem);
  }
  ${media.md`
    .relative-container {
     position: relative; 
    }
    .text {
      min-height: 500px;
    }
    .map {
      height: 100%;
      width: 50vw;

      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
    }
  `}
`
