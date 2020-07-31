import { css } from '@emotion/core'
import { hideVisually } from 'polished'

export const styles = (theme, color, value, dark, disabled, error) => css`
  font-size: 1rem;

  label {
    display: flex;
    align-content: center;
    width: fit-content;
    color: ${dark ? 'white' : 'black'};
    ${error && !value && `color: ${theme.colors.danger}`};
    cursor: ${disabled ? 'not-allowed' : 'pointer'};

    &:focus-within {
      outline: 1px solid ${theme.colors.accent};
    }

    i {
      margin-left: -2px;
      color: ${value ? theme.colors[color] : '#808080'};
      ${error && !value && `color: ${theme.colors.danger}`};
      ${disabled && 'opacity: 0.5'};
    }
  }

  input[type='radio'] {
    ${hideVisually()};
  }
`
