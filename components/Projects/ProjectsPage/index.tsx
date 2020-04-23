/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container } from 'reactstrap'
import Title from 'components/Utils/Title'
import ProjectCards from './ProjectCards'
import { styles } from './styles'

const ProjectsPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Title typed>./projects</Title>
    <Container id='#' className='my-5 py-5 px-1 bg-secondary rounded-0'>
      <ProjectCards />
    </Container>
  </div>
)

export default withTheme(ProjectsPage)
