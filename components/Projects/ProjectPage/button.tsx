/** @jsx jsx */
import { jsx } from '@emotion/core'
import {
  Button
} from 'reactstrap'

const WebsiteButton = ({ dark, link, text, classes }: ButtonType) => {
  return (
    <Button
      tag='a'
      outline
      color={dark ? 'secondary' : 'primary'}
      size='lg'
      className={`rounded-0 ${classes}`}
      href={link}
      target='_blank'
    >
      {text}
    </Button>
  )
}

interface ButtonType {
  dark: Boolean,
  link: String,
  text: String,
  classes?: String,
}

export default WebsiteButton
