import React from 'react'
import { Button, Container, Row, Col } from 'reactstrap'
import ProjectBanner from '../components/ProjectBanner'
import { CommitteeCard } from '../components/Committee'
import project from '../data/ignite-mentoring.json'

export default (props: {}) => (
  <>
    {style}
    <ProjectBanner imageSrc={project.bannerImage} />

    <Container className='py-5 my-5'>
      <Row>
        <Col xs={7}>
          <h1 className='display-4 mb-4'>{project.projectName}</h1>
          <p className='lead'>{project.projectDescription}</p>
        </Col>
        <Col xs={1} />
        <Col md={4}>
          <i className='fas fa-fw fa-laptop-code icon-left' />
          <h5 className='text-right'>{project.projectType}</h5>
          <br />
          <i className='far fa-fw fa-calendar-alt icon-left' />
          <h5 className='text-right'>{project.projectDate}</h5>

          <Button
            outline
            color='primary'
            className='d-none d-md-block big-button'
          >
            Visit website
          </Button>
        </Col>
      </Row>
      <Row className='py-5'>
        <Col md={8}>
          <h3 className='mt-4 font-weight-bold'>Technologies used</h3>
        </Col>
        <Col className='impact-list' xs={4}>
          <h3 className='mt-4 font-weight-bold'>Potential impact</h3>
          <ul>
            {project.impactPoints.map(point => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </Col>
      </Row>
      <Row className='py-5'>
        <Col md={12}>
          <h3 className='mt-4 font-weight-bold'>Members</h3>
          <Col xs={12}>
            <CommitteeCard />
          </Col>
        </Col>
      </Row>
    </Container>
  </>
)

const style = (
  <style jsx>
    {`
      .header {
        font-weight: bolder;
        margin-bottom: 1.2rem;
      }
      .icon-left {
        font-size: 1.5em;
        padding: 1.5rem 0 1.3rem 0;
      }
      .text-right {
        display: inline;
        padding: 0 0 0 3rem;
      }
      .big-button {
        font-size: 1.5rem;
        margin: 1.2rem 0 0 0;
        padding: 0.5rem 2rem;
      }
      .hero {
        margin-top: 4.5rem;
        border-radius: 0;
      }

      .impact-list ul {
        padding: 10px 0 0;
        list-style-type: none;
      }

      .impact-list li {
        margin: 0;
        padding: 5px 0 5px 35px;
        background-image: url('/icons/check-circle-solid.svg');
        background-repeat: no-repeat;
        background-position: left center;
        background-size: 20px;
      }
    `}
  </style>
)
