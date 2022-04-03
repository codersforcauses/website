import { memo, useCallback, useState } from 'react'
import { ProjectModel, ModalProps } from '@lib/types'
import Modal from '@elements/Modal'
import Alert from '@elements/Alert'
import { Button } from '@elements/Button'
import {
  CheckField,
  Form,
  RadioGroup,
  TextArea,
  TextField,
  TextFieldArray
} from '@elements/FormElements'
import validationSchema from './validation'

const appType = ['Web', 'Mobile', 'Desktop']

const defaultValues: Partial<ProjectModel> = {
  name: '',
  description: '',
  dates: {
    start: new Date(),
    end: new Date()
  },
  impact: ['']
}

const ProjectModal = ({ closeModal, ...props }: ProjectModalProps) => {
  const [error, setError] = useState('')
  const handleSubmit = useCallback(
    async values => {
      try {
        setError('')
        console.log(values, values.type.filter(Boolean))

        const slugify = values.name
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '_')
          .replace(/^-+|-+$/g, '')

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
        <div className='grid grid-cols-3 gap-2'>
          <p className='col-span-3 font-mono'>Application type</p>
          {appType.map((app, idx) => (
            <CheckField
              key={app}
              label={app}
              name={`type.${idx}`}
              value={app}
            />
          ))}
        </div>
        <div className='grid gap-2 sm:grid-cols-2'>
          <TextField
            type='date'
            label='Start date'
            name='dates.start'
            pattern='\d{2}-\d{2}-\d{4}'
            // rules={validationSchema.html}
          />
          <TextField
            type='date'
            label='End date'
            name='dates.end'
            pattern='\d{2}-\d{2}-\d{4}'
            // rules={validationSchema.html}
          />
        </div>
        <TextFieldArray
          label='Potential impact'
          name='impact'
          // rules={validationSchema.html}
        />
        <Button type='submit'>Submit</Button>
      </Form>
    </Modal>
  )
}

interface ProjectModalProps extends ModalProps {}

export default memo(ProjectModal)
