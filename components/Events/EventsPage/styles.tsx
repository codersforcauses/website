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
  .events > div:last-of-type {
    margin: 0;
  }
`

export const eventStyles = (theme, date) => css`
  border-left: 1px solid ${theme.colors.primary}50;
  margin: 0 0 2.5rem;
  position: relative;

  &:before {
    content: '${date}';
    font-size: 1.25rem;
    font-family: 'IBM Plex Mono', monospace;
    background-color: ${theme.colors.secondary};
    position: absolute;
    top: -30px;
    padding: 0 0 2.5rem;
  }

  ${media.md`
    &:before {
      top:0;
      left: -30px;
    }
  `}
`
