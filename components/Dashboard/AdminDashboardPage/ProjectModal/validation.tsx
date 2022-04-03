import { RegisterOptions } from 'react-hook-form'

const validationSchema: Record<'html', RegisterOptions> = {
  html: {
    //   required: 'Please enter the text for an announcement',
    //   maxLength: {
    //     value: 256,
    //     message: 'The announcement is more than 256 characters'
    //   }
  }
}

export default validationSchema
