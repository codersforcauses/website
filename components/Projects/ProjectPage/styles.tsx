import { css } from '@emotion/react'

export const styles = (theme, isDark) => css`
  .pad {
    padding: 7rem 0;
    min-height: calc(60vh - 64px);
  }

  .members {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    list-style-type: none;
  }

  .breadcrumbs > ol {
    background-color: transparent;
    padding: 0;
  }
`
