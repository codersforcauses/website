import { useState } from 'react'
import { Alert } from 'reactstrap'
import announcements from 'data/announcements.json'

const Announcement = (props: { text: string; time: string; type: string }) => {
  const [visible, setVisible] = useState(true)

  return (
    <Alert
      color={props.type}
      isOpen={visible}
      toggle={() => setVisible(false)}
      className='d-flex flex-column rounded-0 pr-5'
    >
      <p className='m-0'>{props.text}</p>
      <small className='align-self-end' style={{ opacity: 0.6 }}>
        {props.time}
      </small>
    </Alert>
  )
}

const Announcements = () => {
  return (
    <>
      {announcements.length > 0 ? (
        announcements.map((data, i) => (
          <Announcement
            key={i}
            text={data.text}
            time={data.time}
            type={data?.type}
          />
        ))
      ) : (
        <p className='m-0 text-muted'>No announcements to show</p>
      )}
    </>
  )
}

export default Announcements
