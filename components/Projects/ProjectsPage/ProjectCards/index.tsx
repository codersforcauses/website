/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Row, Col, Card, CardImg, CardTitle } from 'reactstrap'
import Link from 'next/link'
import projects from 'data/projects.json'
import { styles } from './styles'

const ProjectCards = (props: { theme }) => {
  return (
    <Row css={styles(props.theme)}>
      {projects.map(project => (
        <Col
          xs={12}
          md={6}
          key={project.name}
          className='align-items-center justify-content-center mb-5 px-4 space'
        >
          <Link href={project.purl}>
            <a className='text-decoration-none'>
              <Card outline color='secondary' className='bg-light'>
                <CardImg
                  top
                  width='100%'
                  src='https://source.unsplash.com/random'
                  // {project.logo}
                  alt={project.client}
                  className='project-img img-fluid'
                />
                <div className='d-flex align-items-center'>
                  <div className='bg-primary'>
                    <i className='material-icons-sharp text-secondary p-3'>
                      {project.icon}
                    </i>
                  </div>
                  <CardTitle className='font-weight-bold ml-3 mb-0 text-primary monospace'>
                    {project.name}
                  </CardTitle>
                </div>
              </Card>
            </a>
          </Link>
        </Col>
      ))}
    </Row>
  )
}

export default withTheme(ProjectCards)
