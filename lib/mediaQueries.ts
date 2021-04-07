import { css } from '@emotion/react'
import { theme } from './theme'

// iterate through the sizes and create a media template
export const media = Object.keys(theme.breakpoints).reduce(
  (accumulator, label) => {
    // use rem in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = theme.breakpoints[label] / 16
    accumulator[label] = (...args) =>
      css`
        @media (min-width: ${emSize}rem) {
          ${css(...args)};
        }
      `
    return accumulator
  },
  {}
)
