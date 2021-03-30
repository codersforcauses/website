import { css } from '@emotion/react'

export const styles = (theme, isDark, image) => css`
  .pad {
    padding: 7rem 0;
    min-height: calc(60vh - 72px);
  }

  .bg {
    background-image: url('${image}');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .breadcrumbs > ol {
    background-color: transparent;
    padding: 0;
  }
`
