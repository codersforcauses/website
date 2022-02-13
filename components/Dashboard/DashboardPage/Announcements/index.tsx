import { memo } from 'react'
import useSWR from 'swr'
import { ColorProps } from '@helpers/global'
import Alert from '@elements/Alert'

const Announcements = () => {
  const { data: announcements } =
    useSWR<Array<AnnouncementProps>>('/api/announcements')
  return (
    <>
      {announcements?.length ? (
        announcements.map((data, i) => (
          <Alert
            key={i}
            color={data.color}
            className='flex justify-between !mt-1 space-x-2'
          >
            <p dangerouslySetInnerHTML={{ __html: data.html }} />
            <small className='select-none opacity-60'>{data.date}</small>
          </Alert>
        ))
      ) : (
        <p className='m-0 text-muted'>No announcements to show</p>
      )}
    </>
  )
  interface AnnouncementProps {
    color: ColorProps
    html: string
    date: string
  }
}

export default memo(Announcements)
