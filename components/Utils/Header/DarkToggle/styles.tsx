import { css } from '@emotion/core'

export const styles = (theme, isDark) => css`
    color: white;
    position: relative;
    width: 24px;
    height: 24px;

    .light-icon {
        opacity: ${isDark ? 100 : 0};
        transition: all 0.3s;
        position: absolute;
        left: 0px;
    }

    .dark-icon {
        opacity: ${isDark ? 0 : 100};
        transition: all 0.3s; 
        position: absolute;
        left: 0px;
    }
`
