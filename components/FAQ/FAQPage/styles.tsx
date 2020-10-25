import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  .viewer-btn:focus{
    background-color: white;
  }

  ${media.sm`
    .email {
      font-size: 1.75rem;
    }
  `}
`
