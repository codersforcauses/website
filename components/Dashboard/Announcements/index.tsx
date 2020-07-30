import React, { useState } from 'react'
import { Alert } from 'reactstrap'
import announcements from 'data/announcements.json'

const Announcement = (props: { text: string; time: string }) => {
  const [visible, setVisible] = useState(true)

  const onDismiss = () => setVisible(false)

  const colours = [
    'primary',
    'secondary',
    'accent',
    'success',
    'danger',
    'warning',
    'light'
  ]
  const randomColour = colours[Math.floor(Math.random() * colours.length)]
  return (
    <Alert
      color={randomColour}
      isOpen={visible}
      toggle={onDismiss}
      className={`d-flex flex-column rounded-0 pr-5 border border-${
        randomColour === 'light' || randomColour === 'secondary'
          ? 'muted'
          : randomColour
      }`}
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
          <Announcement key={i} text={data.text} time={data.time} />
        ))
      ) : (
        <p className='m-0 text-muted'>No announcements to show</p>
      )}
    </>
  )
}

export default Announcements
