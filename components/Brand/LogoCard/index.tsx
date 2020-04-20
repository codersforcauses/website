/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Card, CardFooter } from 'reactstrap'
import { styles } from './styles'

const LogoCard = (props: {
  dark?: Boolean
  main?: Boolean
  svg: string
  png: string
  theme: Object
}) => (
  <Card
    className={`border border-primary rounded-0 ${
      props.dark && 'bg-primary text-secondary'
    }`}
    css={styles(props.theme, props.svg)}
  >
    <div className={`${props.main ? 'image' : 'image-alternate'} logo-img`} />
    <CardFooter className='border-0 d-flex flex-row-reverse download-links px-1 px-sm-2 px-md-3 bg-transparent'>
      <a
        download
        href={props.png}
        target='_blank'
        rel='noopener noreferrer'
        className={props.dark && 'text-secondary'}
      >
        .png
      </a>
      &ensp;
      <a
        download
        href={props.svg}
        target='_blank'
        rel='noopener noreferrer'
        className={props.dark && 'text-secondary'}
      >
        .svg
      </a>
      <i className='material-icons-sharp flex-grow-1'>get_app</i>
    </CardFooter>
  </Card>
)

export default withTheme(LogoCard)
