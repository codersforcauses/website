import React, { useEffect, useState } from 'react'
import { Row, Col } from 'reactstrap'
import { randomise } from 'helpers/array'
import clients from 'data/clients.json'

const Clients = () => {
  const [clientList, setClientList] = useState([])

  useEffect(() => {
    setClientList(clients.sort(randomise).slice(0, Math.min(4, clients.length)))
  }, [])

  return (
    <Row className='justify-content-around py-5'>
      {clientList.map(client => (
        <Col
          xs={6}
          md={2}
          key={client.name}
          className='d-flex align-items-center mb-4 mb-md-0 justify-content-center'
        >
          <img src={client.logo} alt={client.name} className='img-fluid logo' />
        </Col>
      ))}
    </Row>
  )
}
export default Clients
