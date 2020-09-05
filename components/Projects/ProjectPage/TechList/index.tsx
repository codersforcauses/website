/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import BrandIcon from 'components/Elements/BrandIcons'
import type { Brand } from 'components/Elements/BrandIcons'
import { styles } from './styles'

const TechList = ({ data }: Props) => {
  const theme = useTheme()
  return (
    <>
      {data.map((tech: Tech) => (
        <div key={tech.name} className='d-flex align-items-center monospace mb-3' css={styles(theme)}>
          <div className='bg-primary mr-3 p-2'>
            <BrandIcon icon={tech.icon} dimensions={32} fill='secondary' />
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
}

export default TechList
export type { Tech }
