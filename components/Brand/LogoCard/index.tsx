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
      <CardFooter className='border-0 d-flex download-links px-1 px-sm-2 px-md-3 bg-transparent'>
        <span className='flex-grow-1'>
          <a
            href={props.png}
            download
            className={props.dark && 'text-secondary'}
          >
            <i className='material-icons-sharp'>get_app</i>
          </a>
        </span>
        <a href={props.svg} download className={props.dark && 'text-secondary'}>
          .svg
        </a>
        &ensp;
        <a href={props.png} download className={props.dark && 'text-secondary'}>
          .png
        </a>
      </CardFooter>
    </Card>
  )
}

export default LogoCard
