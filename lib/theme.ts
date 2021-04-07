export const theme: Theme = {
  breakpoints: {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  },

  colors: {
    primary: '#000000',
    secondary: '#ffffff',
    darkBg: '#111111',
    lightBg: '#f8f9fa',
    accent: '#01f1cc',
    success: '#0070F3',
    danger: '#ff0000',
    warning: '#F5A623'
  },

  spacing: {
    1: 0.25,
    2: 0.5,
    3: 1,
    4: 1.5,
    5: 3,
    6: 4.5,
    7: 6,
    auto: 'auto'
  }
}

export interface Theme {
  breakpoints?: Breakpoints
  colors?: Colors
  spacing?: Spacing
}
export interface Colors {
  primary?: string
  secondary?: string
  darkBg?: string
  lightBg?: string
  accent?: string
  success?: string
  danger?: string
  warning?: string
}
export interface Spacing {
  1?: number
  2?: number
  3?: number
  4?: number
  5?: number
  6?: number
  7?: number
  auto?: 'auto'
}
export interface Breakpoints {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}
