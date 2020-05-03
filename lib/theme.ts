export const theme = {
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
    auto: 'auto'
  }
}

export interface Theme {
  breakpoints?: {
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
  }

  colors?: {
    primary?: string
    secondary?: string
    accent?: string
    success?: string
    danger?: string
    warning?: string
  }

  spacing?: {
    1?: number
    2?: number
    3?: number
    4?: number
    5?: number
    auto?: string
  }
}
export interface Breakpoints {
  xs?: Function
  sm?: Function
  md?: Function
  lg?: Function
  xl?: Function
}
