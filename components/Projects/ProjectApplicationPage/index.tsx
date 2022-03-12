import { useCallback, useMemo, useState } from 'react'
import Title from '@components/Utils/Title'
import {
  CheckField,
  Form,
  RadioGroup,
  TextArea,
  TextField
} from '@elements/FormElements'
import { Button } from '@elements/Button'
import validationSchema from './validation'

const weekAvailOptions = [
  {
    label: '1-3 Hours',
    value: '1-3'
  },
  {
    label: '3-5 Hours',
    value: '3-5'
  },
  {
    label: '5-7 Hours',
    value: '5-7'
  },
  {
    label: '7-10 Hours',
    value: '7-10'
  },
  {
    label: '10-15 Hours',
    value: '10-15'
  },
  {
    label: '15+ Hours',
    value: '15+'
  }
]

const ProjectApplicationPage = () => {
  const defaultValues: FormValues = useMemo(
    () => ({
      github: '',
      tech_exp: '',
      part_of_proj: '',
      attend_sat: false,
      attend_wed: false,
      week_avail: '1-3',
      prev_cfc_proj: '',
      discord: '',
      other_deets: ''
    }),
    []
  )

  const handleSubmit = useCallback((values: FormValues) => {
    console.log(values)
  }, [])

  return (
    <>
      <Title>./project application</Title>
      <div className='py-12 bg-secondary text-primary dark:bg-alt-dark dark:text-secondary'>
        <div className='container px-3 mx-auto md:grid md:grid-cols-5'>
          <Form<FormValues>
            showNote
            defaultValues={defaultValues}
            onSubmit={handleSubmit}
            className='md:col-span-3'
          >
            <TextField
              name='discord'
              label='Discord Username'
              placeholder='Test user#1234'
              description='We use Discord for online meetings and project updates'
              rules={validationSchema.discord}
            />
            <TextField
              name='github'
              label='GitHub Username'
              placeholder='codersforcauses'
              description='We use GitHub to collaborate on projects'
              rules={validationSchema.github}
            />
            <TextArea
              name='tech_exp'
              label='Technical Experience'
              placeholder='2nd year CS student. Have a couple of cool side projects pinned on my GitHub'
              description='Feel free to add links to websites and/or repositories'
              rules={validationSchema.tech_exp}
            />
            <TextArea
              name='part_of_proj'
              label='Why do you want to be part of the projects?'
              // description='Tell us what '
              rules={validationSchema.part_of_proj}
            />
            <RadioGroup
              name='week_avail'
              label='Your Weekly Availability'
              options={weekAvailOptions}
              description='On average the number of hours you can spend on the project'
              className='grid grid-cols-2 gap-2 space-y-0 md:grid-cols-3'
            />
            <div className='grid gap-2 md:grid-cols-2'>
              <p className='font-mono md:col-span-2'>
                Are you able to attend the following sessions?
              </p>
              <CheckField
                name='attend_sat'
                label='Saturday sessions'
                description='in-person'
              />
              <CheckField
                name='attend_wed'
                label='Wednesday sessions'
                description='online via Discord'
              />
            </div>
            <TextField
              name='prev_cfc_proj'
              label='Have you been part of a previous CFC project?'
              placeholder='Winter 2020 FoGUWA, Summer 2021 Foodbank'
              description='If yes, tell us the period, year, and project'
            />
            <TextArea
              name='other_deets'
              label="Anything else that you'd like us to know?"
              placeholder="I'm on holiday so I'll be missing the first 2 sessions"
            />
            <Button
              fill
              type='submit'
              // loading={loading}
              className='px-8 max-w-max'
            >
              Sign-in
            </Button>
          </Form>
        </div>
      </div>
    </>
  )
}

interface FormValues {
  github: string
  tech_exp: string
  part_of_proj: string
  attend_sat: boolean
  attend_wed: boolean
  week_avail: '1-3' | '3-5' | '5-7' | '7-10' | '10-15' | '15+'
  prev_cfc_proj: string
  discord: string
  other_deets: string
}

export type ProjectApplicationKeys = keyof FormValues

export default ProjectApplicationPage
