/** @jsxImportSource @emotion/react */
import { useTheme } from '@emotion/react'
import { useContext } from 'react'
import { Container } from 'reactstrap'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import QuestionCard from '../QuestionCard'
import questionList from 'data/faq.json'

const FAQPage = () => {
  const isDark = useContext(DarkContext)
  const theme = useTheme()

  return (
    <div css={styles(theme, isDark)}>
      <Title typed>./Frequently Asked Questions</Title>
      <Container className='pt-2 pb-5 my-5'>
        {questionList.map(question => (
          <QuestionCard
            description={question.description}
            answer={question.answer}
            key={question.id}
            id={question.id}
          />
        ))}
      </Container>
    </div>
  )
}

export default FAQPage
