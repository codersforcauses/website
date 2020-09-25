/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useContext } from 'react'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap'
import { DarkContext } from 'helpers/user'
import TechList from './TechList'
import { styles } from './styles'

const impact: Array<string> = [
  'Improve process efficiency',
  'Promote organisational transparency',
  'Risk mitigation'
]

const ProjectPage = () => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <div css={styles(theme, 'https://source.unsplash.com/random', isDark)}>
      <div className='bg-primary pad bg'>
        <Container className='my-5 py-5' />
      </div>
      <Container className='my-5'>
        <Row>
          <Col xs={12}>
            <Breadcrumb tag='nav' className='breadcrumbs'>
              <BreadcrumbItem
                tag='a'
                href='/projects'
                className={`text-${isDark ? 'secondary' : 'primary'}`}
              >
                Projects
              </BreadcrumbItem>
              <BreadcrumbItem
                active
                tag='span'
                className='active-tab text-muted'
              >
                Ignite Mentoring
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col lg={9}>
            <div className='mb-5'>
              <h1 className='display-4 m-0 mb-4 monospace'>Ignite Mentoring</h1>

              <Row className='align-items-center mb-4 d-lg-none monospace'>
                <Col xs={6} className='d-flex align-items-center'>
                  <i className='material-icons-sharp mr-3'>devices</i>
                  Web Development
                </Col>
                <Col xs={6} className='d-flex align-items-center'>
                  <i className='material-icons-sharp mr-3'>date_range</i>
                  February 2019
                </Col>
              </Row>

              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Possimus tempore quia deserunt praesentium maiores optio
                blanditiis voluptas labore repellat, excepturi, quidem aliquid
                eum soluta unde ipsum repellendus molestias consectetur
                eligendi! Lorem ipsum dolor sit, amet consectetur adipisicing
                elit. Eius, reiciendis a adipisci sequi placeat porro eum
                laborum ipsum voluptatum excepturi aliquid cum, commodi rem ad
                repudiandae! Possimus, facilis minima. Tempore!
              </p>
            </div>
            <div className='mb-5'>
              <h3 className='font-weight-black mb-4'>Technologies used</h3>
              <TechList isDark={isDark} />
            </div>
            <div>
              <h4 className='font-weight-black mb-4'>Members</h4>
            </div>
          </Col>
          <Col lg={3}>
            <div className='d-none d-lg-block mb-5 monospace'>
              <div className='d-flex align-items-center py-3'>
                <i className='material-icons-sharp mr-3'>devices</i>
                Web Development
              </div>
              <div className='d-flex align-items-center py-3'>
                <i className='material-icons-sharp mr-3'>date_range</i>
                February 2019
              </div>
              <Button
                outline
                color={isDark ? 'secondary' : 'primary'}
                size='lg'
                className='rounded-0 my-lg-5'
              >
                Visit Website
              </Button>
            </div>
            <div>
              <h4 className='mb-3 font-weight-bold monospace'>
                Potential impact
              </h4>
              <ul className='p-0'>
                {impact.map((text: string, i: number) => (
                  <li key={i} className='d-flex align-items-center pr-3 my-2'>
                    <i className='material-icons-sharp mr-3'>check_circle</i>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default ProjectPage
