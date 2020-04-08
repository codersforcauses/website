/** @jsx jsx */
import { jsx } from '@emotion/core'
import { withTheme } from 'emotion-theming'
import { Jumbotron, Button, Container, Row, Col } from 'reactstrap'
import Title from '../../Utils/Title'
import { styles } from './styles'

const BrandPage = (props: { theme: Object }) => (
  <div css={styles(props.theme)}>
    <Title typed>./branding</Title>
  </div>
)

export default withTheme(BrandPage)
