import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = theme => css`
  .header {
    font-weight: bolder;
    margin-bottom: 1.2rem;
  }
  .pad {
    padding: 6.6rem 0;
  }
  .events > div:last-of-type {
    margin: 0;
  }
`

export const eventStyles = (theme, isDark, date) => css`
  border-left: 1px solid ${theme.colors[isDark ? 'secondary' : 'primary']}50;
  margin: 0 0 2.5rem;
  position: relative;

  &:before {
    content: '${date}';
    font-size: 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
    background-color: ${theme.colors[isDark ? 'darkBg' : 'secondary']};
    position: absolute;
    top: -30px;
    padding: 0 0 2.5rem;
  }

  ${media.md`
    &:before {
      transform: rotate(90deg);
      top:0;
      left: -60px;
    }
  `}

  ${media.lg`
    &:before {
      transform: none;
      font-size: 1.25rem;
      top:0;
      left: -30px;
    }
  `}
`
