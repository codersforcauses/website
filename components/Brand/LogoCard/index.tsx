/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { Card, CardFooter } from 'reactstrap'
import { styles } from './styles'

const LogoCard = (props: {
  dark?: Boolean
  main?: Boolean
  svg: string
  png: string
}) => {
  const theme = useTheme()

  return (
    <Card
      className={`border border-primary rounded-0 ${
        props.dark && 'bg-primary text-secondary'
      }`}
      css={styles(theme, props.svg)}
    >
      <div className={`${props.main ? 'image' : 'image-alternate'} logo-img`} />
      <CardFooter className='border-0 d-flex flex-row-reverse download-links px-1 px-sm-2 px-md-3 bg-transparent'>
        <a
          download={props.png}
          href=''
          // target='_blank'
          // rel='noopener noreferrer'
          className={props.dark && 'text-secondary'}
        >
          .png
        </a>
        &ensp;
        <a
          download={props.svg}
          href=''
          // target='_blank'
          // rel='noopener noreferrer'
          className={props.dark && 'text-secondary'}
        >
          .svg
        </a>
        <span className='flex-grow-1'>
          <a
            download={props.png}
            href=''
            // target='_blank'
            // rel='noopener noreferrer'
            className={props.dark && 'text-secondary'}
          >
            <i className='material-icons-sharp'>get_app</i>
          </a>
        </span>
      </CardFooter>
    </Card>
  )
}

export default LogoCard
