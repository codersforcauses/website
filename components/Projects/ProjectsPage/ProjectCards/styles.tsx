import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  .space:nth-last-of-type(1) {
    margin: 0 !important;
  }

  .project-img {
    height: 20rem;
    object-fit: contain;
  }

  .secondary-bg {
    background: ${theme.colors[isDark ? 'primary' : 'lightBg']};
  }

  ${media.md`
    .space:nth-last-of-type(2) {
      margin: 0 !important;
    }
  `}
`
