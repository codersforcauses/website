import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  .primary-bg {
    background: ${theme.colors[isDark ? 'darkBg' : 'secondary']};
  }

  .secondary-bg {
    background: ${theme.colors[isDark ? 'primary' : 'lightBg']};
  }

  .hero {
    height: 50vh;
    margin: 0;
  }

  .email {
    font-size: 1.2rem;
    margin: 0;
  }

  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
