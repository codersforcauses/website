/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import BrandIcon from 'components/Elements/BrandIcons'
import { styles } from './styles'

const TechList = ({ data, isDark }: Props) => {
  const theme = useTheme()

  return (
    <div css={styles(theme)}>
      {data.map((tech: Tech) => (
        <div
          key={tech.name}
          className='d-flex align-items-center text-monospace'
          css={styles(theme)}
        >
          <div className='mr-3 bigger'>
            <BrandIcon
              icon={tech.icon}
              dimensions={32}
              fill={isDark ? 'secondary' : 'primary'}
            />
          </div>
          {tech.name}
        </div>
      ))}
    </div>
  )
}

export interface Tech {
  name: string
  icon: string
}
interface Props {
  data: Array<Tech>
  isDark: Boolean
}

export default TechList
