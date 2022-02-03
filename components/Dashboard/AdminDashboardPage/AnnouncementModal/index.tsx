import { memo, useCallback, useState } from 'react'
import { useWatch } from 'react-hook-form'
import { AnnouncementModel, ModalProps } from '@helpers/global'
import Modal from '@elements/Modal'
import Alert from '@elements/Alert'
import { Button } from '@elements/Button'
import { Form, RadioGroup, TextArea } from '@elements/FormElements'
import validationSchema from './validation'

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
      <small className='select-none opacity-60'>{date}</small>
    </Alert>
  )
}

const AnnouncementModal = ({
  closeModal,
  ...props
}: AnnouncementModalProps) => {
  const [error, setError] = useState('')
  const handleSubmit = useCallback(
    async (values: AnnouncementModel) => {
      try {
        setError('')
        await fetch('/api/announcements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values)
        })
        closeModal()
      } catch (err: any) {
        console.log(err)
        setError(err?.message || 'Failed to create announcement')
      }
    },
    [closeModal]
  )

  return (
    <Modal
      heading='Create Announcement'
      open={props.isOpen}
      onClose={closeModal}
    >
      {error && (
        <Alert icon color='danger' className='mb-4'>
          {error}
        </Alert>
      )}
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
          counter={256}
          placeholder='Start typing'
          description='Type out the announcement and see the preview above'
          rules={validationSchema.html}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Modal>
  )
}

interface AnnouncementModalProps extends ModalProps {}

export default memo(AnnouncementModal)
