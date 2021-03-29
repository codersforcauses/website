import { useContext } from 'react'
/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { Row, Col, Card, CardImg, CardTitle } from 'reactstrap'
import Link from 'next/link'
import projects from 'data/projects.json'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'

const ProjectCards = () => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <Row css={styles(theme, isDark)}>
      {projects.map(project => (
        <Col
          xs={12}
          md={6}
          key={project.name}
          className='align-items-center justify-content-center mb-5 px-4 space'
        >
          <Link href={project.purl}>
            <a className='text-decoration-none'>
              <Card className='secondary-bg rounded-0 border-0'>
                <CardImg
                  top
                  width='100%'
                  src={`projects/${project.logo}`}
                  alt={project.client}
                  className='project-img img-fluid rounded-0'
                />
                <div className='d-flex align-items-center'>
                  <div className='bg-primary'>
                    <i className='material-icons-sharp text-secondary p-3'>
                      {project.icon}
                    </i>
                  </div>
                  <CardTitle
                    className={`font-weight-bold ml-3 mb-0 text-${
                      isDark ? 'secondary' : 'primary'
                    } text-monospace`}
                  >
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

export default ProjectCards
