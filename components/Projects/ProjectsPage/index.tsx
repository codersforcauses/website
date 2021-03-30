/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext, useState } from 'react'
import { Button, Container, Col, Row } from 'reactstrap'
import dynamic from 'next/dynamic'
import Title from 'components/Utils/Title'
import ProjectCards from './ProjectCards'
import { styles } from './styles'
import { DarkContext } from 'helpers/user'

const ClientBriefModal = dynamic(() => import('./ProjectDevelopmentModal'))

const ProjectInfo = ({
  setClientBriefModal
}: {
  setClientBriefModal: Function
}) => {
  const isDark = useContext(DarkContext)

  return (
    <div className='mt-5'>
      <p>
        If you're a charity or non-profit looking to potentially work with us,
        we've outlined our processes below.
      </p>
      <Button
        outline
        color={isDark ? 'secondary' : 'primary'}
        className='rounded-0'
        onClick={() => setClientBriefModal(true)}
      >
        Project Development
      </Button>
    </div>
  )
}

const ProjectsPage = () => {
  const [clientBriefModal, setClientBriefModal] = useState(false)
  const theme = useTheme()

  return (
    <div css={styles(theme)}>
      <Title typed>./projects</Title>
      <Container id='#' className='my-5 py-5 rounded-0'>
        <Row>
          <Col lg={9}>
            <ProjectCards />
          </Col>
          <Col lg={3}>
            <ProjectInfo setClientBriefModal={setClientBriefModal} />
          </Col>
        </Row>
        <ClientBriefModal
          isOpen={clientBriefModal}
          closeModal={() => setClientBriefModal(false)}
        />
      </Container>
    </div>
  )
}

export default ProjectsPage
