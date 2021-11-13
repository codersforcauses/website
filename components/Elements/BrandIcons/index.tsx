import simpleIcon from 'simple-icons'

const BrandIcons = ({ dimensions, icon, ...props }: BrandIconsProps) => {
  const simIcon = simpleIcon.Get(icon)
  return (
    <svg
      height={dimensions}
      width={dimensions}
      viewBox='0 0 24 24'
      aria-label={icon}
      role='img'
      {...props}
    >
      <title>{icon}</title>
      <path d={simIcon.path} />
    </svg>
  )
}

interface BrandIconsProps {
  icon: string
  dimensions: number
  className?: string
}

export default BrandIcons
