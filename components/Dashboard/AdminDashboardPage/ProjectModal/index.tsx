import { memo, useCallback, useState } from 'react'
import { ProjectModel, ModalProps } from '@lib/types'
import Modal from '@elements/Modal'
import Alert from '@elements/Alert'
import { Button } from '@elements/Button'
import { Form, RadioGroup, TextArea, TextField } from '@elements/FormElements'
import validationSchema from './validation'

const defaultValues: Partial<ProjectModel> = {
  name: '',
  description: ''
}

const ProjectModal = ({ closeModal, ...props }: ProjectModalProps) => {
  const [error, setError] = useState('')
  const handleSubmit = useCallback(
    async values => {
      try {
        setError('')
        console.log(values)

        // await fetch('/api/projects', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(values)
        // })
        closeModal()
      } catch (err: any) {
        console.log(err)
        setError(err?.message || 'Failed to create project')
      }
    },
    [closeModal]
  )

  return (
    <Modal heading='Create Project' open={props.isOpen} onClose={closeModal}>
      {error && (
        <Alert icon color='danger' className='mb-4'>
          {error}
        </Alert>
      )}
      <Form<Partial<ProjectModel>>
        defaultValues={defaultValues}
        className='mt-0'
        onSubmit={handleSubmit}
      >
        <TextField
          label='Name'
          name='name'
          placeholder='Ignite Mentoring'
          // rules={validationSchema.html}
        />
        <TextArea
          label='Description'
          name='description'
          placeholder='A platform to group members to help at schools'
          // rules={validationSchema.html}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Modal>
  )
}

interface ProjectModalProps extends ModalProps {}

export default memo(ProjectModal)
