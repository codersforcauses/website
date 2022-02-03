import { memo, useCallback } from 'react'
import { useWatch } from 'react-hook-form'
import { AnnouncementModel, ModalProps } from '@helpers/global'
import Modal from '@elements/Modal'
import Alert from '@elements/Alert'
import { Button } from '@elements/Button'
import { Form, RadioGroup, TextArea } from '@elements/FormElements'

const defaultValues: AnnouncementModel = {
  color: 'accent',
  html: ''
}

const colorOptions = [
  {
    label: 'Teal',
    value: 'accent'
  },
  {
    label: 'Blue',
    value: 'success'
  },
  {
    label: 'Yellow',
    value: 'warning'
  },
  {
    label: 'Red',
    value: 'danger'
  }
]

const Preview = () => {
  const [color, html] = useWatch({ name: ['color', 'html'] })

  const pad = (day: number) => day.toString().padStart(2, '0')
  const today = new Date()
  const date = `${pad(today.getDate())}/${pad(today.getMonth() + 1)}/${today
    .getFullYear()
    .toString()
    .substring(2)}`

  return (
    <Alert color={color} className='flex justify-between !mt-1 space-x-2'>
      <p dangerouslySetInnerHTML={{ __html: html || 'Test announcement' }} />
      <small className='opacity-60'>{date}</small>
    </Alert>
  )
}

const AnnouncementModal = ({ ...props }: AnnouncementModalProps) => {
  const handleSubmit = useCallback((values: AnnouncementModel) => {}, [])

  return (
    <Modal
      heading='Create Announcement'
      open={props.isOpen}
      onClose={props.closeModal}
    >
      <Form<AnnouncementModel>
        defaultValues={defaultValues}
        className='mt-0'
        onSubmit={handleSubmit}
      >
        <Preview />
        <RadioGroup
          horizontal
          label='Colour'
          name='color'
          options={colorOptions}
        />
        <TextArea
          label='HTML'
          name='html'
          placeholder='Start typing'
          description='Type out the announcement and see the preview above'
        />
        <Button>Submit</Button>
      </Form>
    </Modal>
  )
}

interface AnnouncementModalProps extends ModalProps {}

export default memo(AnnouncementModal)
