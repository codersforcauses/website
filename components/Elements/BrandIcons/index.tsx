/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import simpleIcon from 'simple-icons'
import { Theme } from 'lib/theme'

const BrandIcons = ({ dimensions, fill, icon }: Props) => {
  const theme: Theme = useTheme()
  const simIcon = simpleIcon.get(icon)
  return (
    <svg
      fill={theme.colors[fill]}
      height={dimensions}
      width={dimensions}
      viewBox='0 0 24 24'
      aria-label={icon}
      role='img'
    >
      <title>{icon}</title>
      <path d={simIcon.path} />
    </svg>
  )
}

interface Props {
  icon: string
  dimensions: number
  fill: keyof Theme['colors']
}

export default BrandIcons
