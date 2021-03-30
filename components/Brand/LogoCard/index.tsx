/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
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
          href=''
          download={props.png}
          className={props.dark && 'text-secondary'}
        >
          .png
        </a>
        &ensp;
        <a
          href=''
          download={props.svg}
          className={props.dark && 'text-secondary'}
        >
          .svg
        </a>
        <span className='flex-grow-1'>
          <a
            href=''
            download={props.png}
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
