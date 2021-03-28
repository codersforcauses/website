import { css } from '@emotion/react'
import { media } from 'lib/mediaQueries'

export const styles = (theme, background) => css`
  .logo-img {
    margin: 0.75rem 2rem calc(2rem - 48px);
  }

  .image {
    height: 10rem;
    background-image: url('${background}');
    background-repeat: no-repeat;
    background-position: center;
  }

  .image-alternate {
    height: 6rem;
    background-image: url('${background}');
    background-repeat: no-repeat;
    background-position: center;
  }

  .download-links {
    font-size: 0.8rem;
  }

  ${media.md`
    .logo-img {
      margin: 5rem 5rem calc(5rem - 48px);
    }
    .image-alternate {
      height: 10rem;
    }
  `}
`
