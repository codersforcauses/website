import { css } from '@emotion/core'
import { media } from '../../../lib/mediaQueries'

export const style = (theme, image) => css`
  .pad {
    padding: 7rem 0;
    min-height: calc(50vh - 72px);
  }

  .bg {
    background-image: url('${image}');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
  }
`
