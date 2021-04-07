import { css } from '@emotion/react'

export const styles = (theme, isDark, image) => css`
  .pad {
    padding: 7rem 0;
    min-height: calc(60vh - 72px);
  }

  .members {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    list-style-type: none;
  }

  .top {
    top: 0;
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
