import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .header {
    font-weight: bolder;
    margin-bottom: 1.2rem;
  }
  .pad {
    padding: 6.6rem 0;
  }
  .relative-container {
    position: relative; 
  }
  .map {
    height: 250px;
    width: 100vw;
    margin-bottom: calc(${theme.spacing[5] * -2}rem);

    position: relative;
    // left: 0;
    right: 0;
    // bottom: 0;
  }

  ${media.lg`
    .map {
      height:100%;
      width: 50vw;

      position: absolute;
      top: 0;
      left: auto;
    }
  `}
`
