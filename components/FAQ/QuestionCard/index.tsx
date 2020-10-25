/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from 'emotion-theming'
import { UncontrolledCollapse, Button, CardBody, Card } from 'reactstrap'
import { styles } from './styles'
import { DarkContext } from 'helpers/user'
import { useContext,useState } from 'react'

const ToggleBtn = (props: any)=>{
    const isDark = useContext(DarkContext)
    const [isOpen,setIsopen]=  useState(false)

    const toggle = ()=>{
        setIsopen(!isOpen)
    }

    return(
        <Button id={props.id} outline={isDark} color={isDark ? 'secondary' : 'primary'} className='rounded-0' style={{ height: '40px',minWidth:'40px'}} onClick={toggle}>
            {isOpen? '-':'+'}
        </Button>
    )
}

const QuestionCard = (props: any) => {
    const theme = useTheme()
    const isDark = useContext(DarkContext)

    return (
        <div>
            <Card
                className={`rounded-0 border-0 ${props.className}`}
                css={styles(theme, isDark)}
                style={{backgroundColor:'transparent'}}
                >
                <CardBody className='d-flex justify-content-between align-items-center'>
                    <h4>
                        {`Q${props.num}: ${props.description}`}
                    </h4>
                    <ToggleBtn id={props.id}/>
                </CardBody>
            </Card>
            
            <UncontrolledCollapse toggler={`#${props.id}`}>
                {console.log(props.id)}
                <Card
                    className={`rounded-0 border-0 ${props.className}`}
                    css={styles(theme, isDark)}
                    style={{ backgroundColor: 'transparent' }}
                    >
                    <CardBody dangerouslySetInnerHTML={{__html:props.answer}}>
                    </CardBody>
                </Card>
            </UncontrolledCollapse>
        </div>
    )
}

export default QuestionCard
