/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Container } from 'reactstrap'
import Title from '../../Utils/Title'
import ProjectCards from '../ProjectCards'
import { style } from './style'

const ProjectsPage = (props: { theme: Object }) => (
  <div css={style(props.theme)}>
    <Title typed>./projects</Title>
    <Container id='#' className='my-5 py-5 px-1 bg-white rounded-0'>
      <ProjectCards />
    </Container>
  </div>
)

export default withTheme(ProjectsPage)
