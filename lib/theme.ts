export const theme = {
  breakpoints: {
    xs: 360,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },

  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    accent: '#01f1cc',
    // colors to be defined
    success: '#5cb85c',
    error: '#CF3A24',
    warning: '#f0ad4e',
  },

  spacing: {
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 1.5,
    5: 3,
    auto: 'auto',
  },
}

export interface Breakpoints {
  xs?: Function
  sm?: Function
  md?: Function
  lg?: Function
  xl?: Function
}
