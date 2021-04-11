import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;

  .project-img {
    height: 20rem;
    object-fit: contain;
  }

  .secondary-bg {
    background: ${theme.colors[isDark ? 'primary' : 'lightBg']};
  }

  ${media.md`
    grid-template-columns: 1fr 1fr;
  `}
`
