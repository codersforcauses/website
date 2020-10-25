/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useState, useContext } from 'react'
import { Jumbotron, Container, Row, Col, Card, Input } from 'reactstrap'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import QuestionCard from '../QuestionCard'

const FAQPage = () => {
    const [typographyText, setTypographyText] = useState('Coders for Causes')
    const isDark = useContext(DarkContext)
    const theme = useTheme()

    return (
        <div css={styles(theme, isDark)}>
            <Title typed>./frequently asked questions</Title>
            <Container className='pt-2 pb-5 my-5'>
                <QuestionCard />
            </Container>
        </div>
    )
}

export default FAQPage
