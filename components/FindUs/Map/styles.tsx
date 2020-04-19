import { css } from '@emotion/core'

export const styles = (theme, marker) => css`
  height: 100%;
  width: 100%;

  .marker {
    background-image: url(${marker});
    background-size: cover;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
`
