/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { useContext } from 'react'
import { Container} from 'reactstrap'
import Title from 'components/Utils/Title'
import { DarkContext } from 'helpers/user'
import { styles } from './styles'
import QuestionCard from '../QuestionCard'

const questionList = [
    {
        id:'external_member_signup',
        description:'Who can sign up to be CFC member?',
        answer:'Our membership is not limited to UWA students. Everyone with an interest in software development is welcome to join.'
    },
    {
        id:'membership_fee',
        description:'How much does it cost to become a member?',
        answer:'$5 :) either via <a target="_blank" href="https://cfcmemberships.getqpay.com/">Qpay<\/a> or contact our friendly committee. This is needed to participate in our projects and provides discounts for our paid events.'
    },
    {
        id:'project_duration',
        description:'Do projects run during semester as well?',
        answer:'Our projects are open source, so feel free to contribute whenever. If you need help getting started on a project, please reach out to our committee, we are happy to help.'
    },
    {
        id:'during_semester',
        description:'What do you offer during semester?',
        answer:'We run technical workshops, social events and industry events during semester.'
    },
    {
        id:'stack_choice',
        description:'What stack do you normally use for your projects?',
        answer:'We work with Javascript, Typescript and Node. Frameworks will likely be either Vue with Nuxt.js or React with Next.js and an Express backend.'
    },
    {
        id:'inexperienced_newbie',
        description:'Should I apply if I don\'t have any experience with HTML/CSS/Javascript?',
        answer: 'It\'s strongly recommended but not necessary. The reason for that is we work with technologies that build on top of those basic fundamentals. Without knowing the basics, it might be hard to grasp more difficult concepts. If you would like some guidance on where to start, head to the #coding-resources section in our Discord server! '
    },
    {
        id:'hour_committed',
        description:'How many hours do I have to contribute per week towards the project?',
        answer:'This is completely up to you. We understand that people might be busy sometimes during the holidays and this is volunteer work, so we won\'t force people to commit to certain hours. However we will ask your availability during our applicant interview to get a rough idea, which helps us to plan and schedule our project resources and timeline.'
    },
    {
        id:'volunteer_hour_credit',
        description:'Can I get credit from the university for the volunteer hours I contributed towards the project?',
        answer:'You certainly can. During the project we will show you how to submit your hours to us for accreditation via Guild Volunteering.'
    },
    {
        id:'summer_project_expectation',
        description:'What exactly to be expected for participating summer project?',
        answer:'The project group will meet at campus every 1-2 weeks, days to be decides by each group\'s availability. You can get help from team members, talk about the design or do code review with other member during this session. We also invite industry partner to give short talks/workshops to get you familiarised with industry software practice.'
    },
    {
        id:'apply_project',
        description:'I\'m very interested in summer project, how do I apply?',
        answer:'Visit this <a target="_blank" href="https://forms.gle/jmQ6xXwbfDUBWno18">Google form<\/a>, fill out your detail and answer some short question and we will get back to you to arrange an interview if you\'re success. Applications close November 6th 11:59pm'
    }
]

const FAQPage = () => {
    const isDark = useContext(DarkContext)
    const theme = useTheme()

    return (
        <div css={styles(theme, isDark)}>
            <Title typed>./frequently asked questions</Title>
            <Container className='pt-2 pb-5 my-5'>
                {questionList.map((question,index)=>(
                    <QuestionCard description={question.description} answer={question.answer} key={question.id} id={question.id} num={index+1}/>
                )
                )}
            </Container>
        </div>
    )
}

export default FAQPage
