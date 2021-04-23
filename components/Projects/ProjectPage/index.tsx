/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext } from 'react'
import { Breadcrumb, BreadcrumbItem, Container, Row, Col } from 'reactstrap'
import { DarkContext } from 'helpers/user'
import TechList from './TechList'
import type { Tech } from './TechList'
import { styles } from './styles'
import WebsiteButton from './button'

const parseDescription = text =>
  text.split('\n').map(para => <p key={para}>{para}</p>)

const Impact = ({
  impact,
  ...props
}: {
  impact: Array<string>
  className?: string
}) => (
  <div {...props}>
    <h4 className='mb-3 font-weight-bold monospace'>Potential impact</h4>
    <ul className='p-0'>
      {impact.map((text: string, i: number) => (
        <li key={i} className='d-flex align-items-center pr-3 my-2'>
          <i className='material-icons-sharp mr-3'>check_circle</i>
          {text}
        </li>
      ))}
    </ul>
  </div>
)

const ProjectPage = ({ data }: Props) => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <div css={styles(theme, isDark)}>
      <div className='bg-primary position-relative pad'>
        <Image
          alt={data?.alt ?? `An image of the front page of ${data.name}`}
          src={`/projects/${data.img}`}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <Container className='my-5'>
        <Row>
          <Col xs={12}>
            <Breadcrumb tag='nav' className='breadcrumbs'>
              <Link href='/projects' passHref>
                <BreadcrumbItem
                  tag='a'
                  className={`text-${isDark ? 'secondary' : 'primary'}`}
                >
                  Projects
                </BreadcrumbItem>
              </Link>
              <BreadcrumbItem active tag='span' className='active-tab'>
                {data.name}
              </BreadcrumbItem>
            </Breadcrumb>
          </Col>
        </Row>
        <Row className='position-relative'>
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
              {parseDescription(data.desc)}
              <div className='d-lg-none mt-2'>
                {data.url && (
                  <WebsiteButton
                    dark={isDark}
                    link={data.url}
                    text='Visit Website'
                    classes='mr-3'
                  />
                )}
                {data.source && (
                  <WebsiteButton
                    dark={isDark}
                    link={data.source}
                    text='Visit Source'
                  />
                )}
              </div>
            </div>
            <Impact impact={data.impact} className='d-lg-none mb-5' />
            <h4 className='font-weight-black mb-4'>Technologies used</h4>
            <div className='mb-5'>
              <TechList isDark={isDark} data={data.tech} />
            </div>
            <h4 className='font-weight-black mb-4'>Members</h4>
            <ul className='members p-0 m-0'>
              {data.members.map((member: string) => (
                <li key={member}>{member}</li>
              ))}
            </ul>
          </Col>
          <Col lg={3} className='d-none d-lg-block position-relative'>
            <div className='sticky-top'>
              <div className='mb-5 text-monospace'>
                <div className='d-flex align-items-center py-3'>
                  <i className='material-icons-sharp mr-3'>devices</i>
                  {data.type}
                </div>
                <div className='d-flex align-items-center py-3'>
                  <i className='material-icons-sharp mr-3'>date_range</i>
                  {data.date}
                </div>
                {data.url && (
                  <WebsiteButton
                    dark={isDark}
                    link={data.url}
                    text='Visit Website'
                    classes='mt-3'
                  />
                )}
                {data.source && (
                  <WebsiteButton
                    dark={isDark}
                    link={data.source}
                    text='Visit Source'
                    classes='mt-3'
                  />
                )}
              </div>
              <Impact impact={data.impact} />
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
  alt?: string
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
