/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Container } from 'reactstrap'
import Title from 'components/Utils/Title'
import ProjectCards from './ProjectCards'
import { styles } from './styles'

const ProjectsPage = () => {
  const theme = useTheme()

  return (
    <div css={styles(theme)}>
      <Title typed>./projects</Title>
      <Container id='#' className='my-5 py-5 px-1 bg-secondary rounded-0'>
        <ProjectCards />
      </Container>
    </div>
  )
}

export default ProjectsPage
