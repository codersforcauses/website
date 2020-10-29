import { withTheme } from 'emotion-theming'
import { useCallback, useState } from 'react'
import { Container, Carousel, CarouselItem } from 'reactstrap'
import Title from 'components/Utils/Title'
import Step1 from './Step1'
import Step2 from './Step2'

const SignUpPage = (props: { route?: string; signIn: Function }) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [animating, setAnimating] = useState(false)

  const nextStep = useCallback(() => {
    if (animating) return
    setCurrentStep(1)
  }, [animating])
  const previousStep = useCallback(() => {
    if (animating) return
    setCurrentStep(0)
  }, [animating])
  const carouselExiting = useCallback(() => setAnimating(true), [])
  const carouselExited = useCallback(() => setAnimating(false), [])

  const steps = [0, 1].map(index => (
    <CarouselItem
      onExiting={carouselExiting}
      onExited={carouselExited}
      key={index}
    >
      {currentStep === 0
        ? (
          <Step1 signIn={props.signIn} nextStep={nextStep} />
          )
        : (
          <Step2 route={props.route} />
          )}
    </CarouselItem>
  ))

  return (
    <div>
      <Title typed>./sign-up</Title>
      <Container className='py-5 '>
        <Carousel
          activeIndex={currentStep}
          interval={false}
          next={nextStep}
          previous={previousStep}
        >
          {steps}
        </Carousel>
      </Container>
    </div>
  )
}

export default withTheme(SignUpPage)
