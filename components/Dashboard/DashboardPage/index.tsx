/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Container, Row, Col, Card, Input } from 'reactstrap'
import Title from '../../Utils/Title'
import { styles } from './styles'

const BrandPage = (props: { theme: Object }) => {
  return (
    <div css={styles(props.theme)}>
      <Title typed>./dashboard</Title>
    </div>
  )
}

export default withTheme(BrandPage)
