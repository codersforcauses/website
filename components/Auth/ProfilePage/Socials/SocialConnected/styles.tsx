import { css } from '@emotion/react'

export const buttonStyle = color => css`
  background-color: ${color};
  border-color: ${color};
  &:hover {
    background-color: ${color}cc;
    border-color: ${color}cc;
  }

  .icon {
    position: absolute;
    left: 1.5rem;
  }
`

export const connectedStyle = color => css`
  background-color: ${color}33;
  border-color: ${color};
  font-size: 1.25rem;
  min-height: 3rem;

  .icon {
    position: absolute;
    left: 1.5rem;
  }

  .delete {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    position: absolute;
    right: 0;
    min-height: 3rem;
  }
`
