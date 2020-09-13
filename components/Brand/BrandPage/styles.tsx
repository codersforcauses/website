import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  .hero {
    margin-top: 64px;
    height: 500px;
  }

  .secondary-bg {
    background: ${theme.colors[isDark ? 'darkBg' : 'lightBg']};
  }

  .email {
    font-size: 1rem;
  }

  .big {
    font-size: 2rem;
    line-height: 1.2;
  }



  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
