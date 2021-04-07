import { css } from '@emotion/react'
import { theme, Breakpoints } from './theme'

type Media = Record<keyof Breakpoints, Function>

// iterate through the sizes and create a media template
export const media: Partial<Media> = Object.keys(theme.breakpoints).reduce(
  (accumulator, label) => {
    // use rem in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const remSize = theme.breakpoints[label] / 16
    accumulator[label] = (...args) =>
      css`
        @media (min-width: ${remSize}rem) {
          ${css(...args)};
        }
      `
    return accumulator
  },
  {}
)
