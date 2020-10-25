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
        answer:'Our membership is not limited to UWA student. Everybody who has a heart for software dev is welcome to be part of us.'
    },
    {
        id:'membership_fee',
        description:'How much do I pay to be a member?',
        answer:'$5 :) either via <a target="_blank" href="https://cfcmemberships.getqpay.com/">Qpay<\/a> or contact our friendly committee.'
    },
    {
        id:'project_duration',
        description:'Do you guys run projects during semester as well?',
        answer:'Our project is open source, so feel free to contribute whenever. If you need help to start the project, please reach out to committee we are happy to help.'
    },
    {
        id:'during_semester',
        description:'What do you offer during semester then?',
        answer:'We run workshop and event during semester.'
    },
    {
        id:'stack_choice',
        description:'What stack do you guys intend on using for project?',
        answer:'We work with Javascript, Typescript and Node. Framework will most likely be Vue and Nuxt.js with express, or React with Next.js'
    },
    {
        id:'inexperienced_newbie',
        description:'Is it recommended to apply if I don\'t have any experience with html/css/javascript?',
        answer: 'It\'s strongly recommended but not necessary. The reason for that is we work with technologies that build on top of those basic language. Without knowing the basic, it might be hard to grasp the concept. If you would like some guidance for learning, feel free to head to #coding-resources section in our Discord server! '
    },
    {
        id:'hour_committed',
        description:'How many hours do I have to contribute per week toward the project?',
        answer:'This is completely up to you. We understand that people might be busy sometimes during the holiday and this is volunteer work, so we won\' force people to commit certain hours. However we will ask your availability during our applicant interview to get a rough idea, which help to plan and schedule our project resources and timeline.'
    },
    {
        id:'volunteer_hour_credit',
        description:'Can I get credit from university for the volunteer hour I contributed for the project?',
        answer:'You certainly can. Please fill out the Google form after your session and we will evaluate, sum up hour and submit for you. ***this needs more***'
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
