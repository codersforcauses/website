import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = (theme, background) => css`
  background-color: ${theme.colors[background]};

  ${media.sm`
    height: 10rem;
  `}
  ${media.md`
    height: 20rem;
  `}
`
