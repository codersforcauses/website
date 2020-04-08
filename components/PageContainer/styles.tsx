import { css } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

export const globalStyle = theme => css`
  ${emotionNormalize}

  * {
    box-sizing: border-box;
  }

  :root {
    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
  }

  html,
  body {
    background: ${theme.colors.secondary};
    color: ${theme.colors.primary};
    overflow-x: hidden;
    line-height: 1.5em;
  }

  ::-moz-selection,
  ::selection {
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
    text-shadow: none;
  }

  .main {
    margin-top: 72px;
    min-height: calc(100vh - 284px);
  }

  /*
    Offsets all ID's with prefix '_' with the height of header.
    This also means all ID's must be prefixed by '_'.
  */
  [id^="_"] {
    scroll-margin-top: 72px;
  }

  .monospace {
    font-family: 'IBM Plex Mono';
  }

  .font-weight-black {
    font-weight: 900;
  }

  .md-lg {
    font-size: 4rem;
  }
  .md-xl {
    font-size: 6rem;
  }
`
