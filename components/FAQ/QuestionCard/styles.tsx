import { css } from '@emotion/core'
import { media } from 'lib/mediaQueries'

export const styles = (theme, isDark) => css`
  background-color: ${theme.colors[isDark ? 'primary' : 'lightBg']};
`
