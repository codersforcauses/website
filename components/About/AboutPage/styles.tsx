import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  .header {
    font-weight: bolder;
    margin-bottom: 1.2rem;
  }

  .secondary-bg {
    background: ${theme.colors[isDark ? 'primary' : 'light']};
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
    margin-bottom: calc(${theme.spacing[5] * -1}rem);
  }

  ${media.lg`
    .map {
      height:100%;
      width: 50vw;
      position: absolute;
      top: 0;
      right: 0;
    }
  `}
`
