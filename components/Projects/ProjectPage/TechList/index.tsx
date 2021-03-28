import { useTheme } from '@emotion/react'
import BrandIcon from 'components/Elements/BrandIcons'
import type { Brand } from 'components/Elements/BrandIcons'
import { styles } from './styles'

const TechList = ({ data, isDark }: Props) => {
  const theme = useTheme()
  return (
    <>
      {data.map((tech: Tech) => (
        <div
          key={tech.name}
          className='d-flex align-items-center text-monospace mb-3'
          css={styles(theme)}
        >
          <div className={`mr-3 bigger bg-${isDark ? 'secondary' : 'primary'}`}>
            <BrandIcon
              icon={tech.icon}
              dimensions={32}
              fill={isDark ? 'primary' : 'secondary'}
            />
          </div>
          {tech.name}
        </div>
      ))}
    </>
  )
}

interface Tech {
  name: string
  icon: Brand
}
interface Props {
  data: Array<Tech>
  isDark: Boolean
}

export default TechList
export type { Tech }
