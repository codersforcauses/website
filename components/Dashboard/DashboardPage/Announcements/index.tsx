import { useState } from 'react'
import Alert, { AlertColor } from '@elements/Alert'
import announcements from 'data/announcements.json'

interface AnnouncementProps {
  text: string
  time: string
  type: AlertColor
}

const Announcement = (props: AnnouncementProps) => {
  const [visible, setVisible] = useState(true)

  return (
    <Alert color={props.type} className='flex justify-between space-x-2'>
      <p>{props.text}</p>
      <small className='opacity-60'>{props.time}</small>
    </Alert>
  )
}

const Announcements = () => {
  return (
    <>
      {announcements.length ? (
        announcements.map((data, i) => (
          <Announcement
            key={i}
            text={data.text}
            time={data.time}
            type={data?.type as AlertColor}
          />
        ))
      ) : (
        <p className='m-0 text-muted'>No announcements to show</p>
      )}
    </>
  )
}

export default Announcements
