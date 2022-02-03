const QuestionCard = (props: QuestionCardProps) => (
  <div className='space-y-3'>
    <p className='font-mono text-lg font-black'>{props.description}</p>
    <p dangerouslySetInnerHTML={{ __html: props.answer }} />
  </div>
)

interface QuestionCardProps {
  description: string
  answer: string
}

export default QuestionCard
