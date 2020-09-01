/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { styles } from './styles'

const TechList = ({ data }: Props) => {
  const theme = useTheme()
  return (
    <>
      {data.map((tech: Tech) => (
        <div key={tech.name} className='d-flex align-items-center monospace mb-3' css={styles(theme)}>
          <div className='bg-primary mr-3 bigger'>
            <i className='material-icons-sharp text-secondary p-2 bigger'>{tech.icon}</i>
          </div>
          {tech.name}
        </div>
      ))}
    </>
  )
}

interface Tech {
  name: string,
  icon: string
}
interface Props {
  data: any
}

export default TechList
