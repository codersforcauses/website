import { RegisterOptions } from 'react-hook-form'
import { ProjectApplicationKeys } from '.'

const validationSchema: Omit<
  Record<ProjectApplicationKeys, RegisterOptions>,
  'attend_sat' | 'attend_wed' | 'week_avail' | 'prev_cfc_proj' | 'other_deets'
> = {
  github: {
    required: 'Your GitHub username is required'
  },
  tech_exp: {
    required:
      "Please enter N/A if you don't have any previous coding experience"
  },
  part_of_proj: {
    required: 'Please enter why you would like to sign up for the projects'
  },
  discord: {
    required: 'Please enter your Discord username',
    pattern: {
      value: /^.{3,32}#[0-9]{4}$/,
      message:
        'Discord username has invalid format. Must be in format `username#0000`'
    }
  }
}

export default validationSchema
