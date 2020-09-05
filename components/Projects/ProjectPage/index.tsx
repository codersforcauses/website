/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import {
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Container,
  Row,
  Col
} from 'reactstrap'
import TechList from './TechList'
import type { Tech } from './TechList'
import { styles } from './styles'

const parseDescription = (text) => (
  text.split('\n').map((para) => (
    <p key={para}>{para}</p>
  )))

const ProjectPage = ({ data }: Props) => {
  const theme = useTheme()

  return (
    <div css={styles(theme, data.img)}>
      <div className='bg-primary pad bg'>
        <Container className='my-5 py-5' />
      </div>
      <Container className='my-5'>
        <Row>
          <Col xs={12}>
            <Breadcrumb tag='nav' className='breadcrumbs'>
              <BreadcrumbItem tag='a' href='/projects'>
                Projects
              </BreadcrumbItem>
              <BreadcrumbItem active tag='span' className='active-tab'>
                {data.name}
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
          <Col lg={9}>
            <div className='mb-5'>
              <h1 className='display-4 m-0 mb-4 monospace'>{data.name}</h1>
              <Row className='align-items-center mb-4 d-lg-none monospace'>
                <Col xs={6} className='d-flex align-items-center'>
                  <i className='material-icons-sharp mr-3'>{data.icon}</i>
                  {data.type}
                </Col>
                <Col xs={6} className='d-flex align-items-center'>
                  <i className='material-icons-sharp mr-3'>date_range</i>
                  {data.date}
                </Col>
              </Row>
              <p>
                {parseDescription(data.desc)}
              </p>
              <div className='d-lg-none mt-2'>
                {data.url &&
                  <Button
                    tag='a'
                    outline
                    color='primary'
                    size='lg'
                    className='rounded-0 mr-3'
                    href={data.url}
                    target='_blank'
                  >
                    Visit Website
                  </Button>}
                {data.source &&
                  <Button
                    tag='a'
                    outline
                    color='primary'
                    size='lg'
                    className='rounded-0'
                    href={data.source}
                    target='_blank'
                  >
                    View Source
                  </Button>}
              </div>
            </div>
            <div className='mb-5'>
              <h3 className='font-weight-black mb-4'>Technologies used</h3>
              <TechList data={data.tech} />
            </div>
            <div className='mb-5'>
              <h4 className='font-weight-black mb-4'>Members</h4>
              {data.members.map((member: string) => (
                <p key={member}>{member}</p>
              ))}
            </div>
          </Col>
          <Col lg={3}>
            <div className='d-none d-lg-block mb-5 monospace'>
              <div className='d-flex align-items-center py-3'>
                <i className='material-icons-sharp mr-3'>devices</i>
                {data.type}
              </div>
              <div className='d-flex align-items-center py-3'>
                <i className='material-icons-sharp mr-3'>date_range</i>
                {data.date}
              </div>
              {data.url &&
                <Button
                  tag='a'
                  outline
                  color='primary'
                  size='lg'
                  className='rounded-0 mt-3'
                  href={data.url}
                  target='_blank'
                >
                  Visit Website
                </Button>}
              {data.source &&
                <Button
                  tag='a'
                  outline
                  color='primary'
                  size='lg'
                  className='rounded-0 mt-3'
                  href={data.source}
                  target='_blank'
                >
                  View Source
                </Button>}
            </div>
            <div>
              <h4 className='mb-3 font-weight-bold monospace'>
                Potential impact
              </h4>
              <ul className='p-0'>
                {data.impact.map((text: string, i: number) => (
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

interface ProjectType {
  id: string
  icon: string
  img: string
  name: string
  client: string
  type: string
  date: string
  purl: string
  url?: string
  source?: string
  impact: Array<string>
  desc: string
  tech: Array<Tech>
  members: Array<string>
}

interface Props {
  data: ProjectType
}

export default ProjectPage
export type { ProjectType }
