import { css } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

export const globalStyle = (theme, isDark) => css`
  ${emotionNormalize}

  *, *::before, *::after {
    box-sizing: border-box;
    transition: background 0.5s, color 0.5s, border 0.5s;
  }

  :root {
    font-family: 'IBM Plex Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
      'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
      'Noto Color Emoji';
    font-size: clamp(14px, 5vmin, 16px);
  }

  html,
  body {
    background: ${theme.colors[isDark ? 'darkBg' : 'secondary']};
    color: ${theme.colors[isDark ? 'secondary' : 'primary']};
    overflow-x: hidden;
    line-height: 1.5em;
    scroll-behavior: smooth;
    overscroll-behavior-y: none;
    transition: background 0.5s, color 0.5s, border 0.5s;
  }

  ::selection {
    background: ${theme.colors.accent};
    color: ${theme.colors.primary};
    text-shadow: none;
  }

  .main {
    margin-top: 64px;
    min-height: calc(100vh - (64px + 236px));
  }

  /*
    Offsets all ID's with prefix '_' with the height of header.
    This also means all ID's must be prefixed by '_'.
  */
  [id^='_'] {
    scroll-margin-top: 64px;
  }

  .modal-content {
    background-color: ${theme.colors[isDark ? 'darkBg' : 'secondary']};
  }

  .monospace {
    font-family: 'IBM Plex Mono';
  }

  input {
    color: ${theme.colors.primary};
  }

  a:focus,
  button:focus {
    outline: 1px dotted ${theme.colors.accent} !important;
    outline-offset: 0.25rem !important;
  }

  .modal-content {
    border-radius: 0;
  }

  .md-lg {
    font-size: 4rem;
  }
  .md-xl {
    font-size: 6rem;
  }

  .tab-nav {
    &:hover {
      cursor: pointer;
      border: 1px solid ${theme.colors.primary}66;
    }
  }

  .logo {
    object-fit: contain;
    object-position: center;
    max-height: 100px;
    width: 100%;

    transition: 0.3s;
    filter: grayscale(100%) contrast(0.2) brightness(1.1);

    &:hover {
      filter: none;
      // cursor: pointer;
    }
  }

  .toast {
    position: fixed;
    inset: auto 1rem 1rem auto;
    max-width: 320px;
    z-index: 10;
  }

  .legal-content {
    font-size: 14px;
    counter-reset: paragraph;

    .list-heading,
    li {
      position: relative;
    }
    .list-heading:after {
      counter-increment: paragraph;
      content: counter(paragraph, decimal-leading-zero) '';
      position: absolute;
      padding-right: 1rem;
      right: 100%;
      top: 0;
    }

    .list-heading:before {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background-color: ${theme.colors[isDark ? 'secondary' : 'primary']};
      position: absolute;
      left: -10px;
      top: 0px;
    }

    ol {
      counter-reset: section;
      > li {
        list-style: none;

        &:before {
          counter-increment: section;
          content: counters(paragraph, '') '.' counters(section, '.') ' ';
          position: absolute;
          padding-right: 1rem;
          right: 100%;
          top: 0;
        }
      }
    }
  }

  .changelog {
    font-size: 14px;
    position: relative;

    &:before {
      content: '';
      display: block;
      width: 2px;
      height: 100%;
      background-color: ${theme.colors[isDark ? 'secondary' : 'primary']};
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
`
